import { IProvedorDadosDemograficos } from "../../domain/repositories/IprovedorDadosDemográficos";
import { Estado } from "../../domain/entities/Estado";
import { Municipio } from "../../domain/entities/Municipio";
import { EstadoIbge } from "../../domain/repositories/IEstadosIbge";
import { MunicipioIbge } from "../../domain/repositories/IMunicipioIbge";
import { CAPITAIS } from "../../common/constants/capitais";

export class IbgeDadosService implements IProvedorDadosDemograficos {
  private readonly baseUrl: string = "https://servicodados.ibge.gov.br/api";

  async buscarEstados(): Promise<Estado[]> {
    const response = await fetch(
      `${this.baseUrl}/v1/localidades/estados?orderBy=nome`,
    );
    const data = await response.json();
    return data.map(
      (est: EstadoIbge) => new Estado(est.id, est.sigla, est.nome, est.regiao),
    );
  }

  async buscarEstadosPorRegiao(idRegiao: number): Promise<Estado[]> {
    const response = await fetch(
      `${this.baseUrl}/v1/localidades/regioes/${idRegiao}/estados`,
    );
    const data = await response.json();
    return data.map(
      (est: EstadoIbge) => new Estado(est.id, est.sigla, est.nome, est.regiao),
    );
  }

  async buscarPopulacaoMunicipio(idMunicipio: number): Promise<number> {
    const response = await fetch(
      `${this.baseUrl}/v3/agregados/9514/periodos/2022/variaveis/93?localidades=N6[${idMunicipio}]`,
    );
    const data = await response.json();

    try {
      const valorStr = data[0].resultados[0].series[0].serie["2022"];
      return Number(valorStr) || 0;
    } catch {
      return 0; // Fallback caso não encontre
    }
  }

  private async buscarMunicipiosIbge(
    siglaEstado: string,
  ): Promise<MunicipioIbge[]> {
    const response = await fetch(
      `${this.baseUrl}/v1/localidades/estados/${siglaEstado}/municipios`,
    );

    return await response.json();
  }

  private async criarIndicePopulacao(uf: number): Promise<Map<number, number>> {
    const response = await fetch(
      `${this.baseUrl}/v3/agregados/9514/periodos/2022/variaveis/93?localidades=N6[N3[${uf}]]`,
    );

    const data = await response.json();

    const mapa = new Map<number, number>();

    for (const serie of data[0].resultados[0].series) {
      mapa.set(Number(serie.localidade.id), Number(serie.serie["2022"]));
    }

    return mapa;
  }

  async buscarMunicipiosPorEstado(siglaEstado: string): Promise<Municipio[]> {
    // 1. Busca os municípios na API de localidades
    const municipiosIbge = await this.buscarMunicipiosIbge(siglaEstado);

    // 2. Obtém o código da UF (todos os municípios pertencem à mesma UF)
    const Uf =
      municipiosIbge[0]["regiao-imediata"]["regiao-intermediaria"].UF.id;

    // 3. Busca todas as populações e cria um índice (Map)
    const indicePopulacao = await this.criarIndicePopulacao(Uf);
    const idCapital = CAPITAIS[siglaEstado];

    // 4. Monta os objetos Municipio
    return municipiosIbge.map((mun: MunicipioIbge) => {
      const Id = mun.id;
      const Nome = mun.nome;
      const regiaoImediata = mun["regiao-imediata"];
      const regiaoIntermediaria = regiaoImediata["regiao-intermediaria"];
      const uf = regiaoIntermediaria.UF;
      const populacao = indicePopulacao.get(mun.id) ?? 0;
      const eCapital = Id === idCapital; // retorna true ou false
      return new Municipio(
        Id,
        Nome,
        {
          id: regiaoImediata.id,
          nome: regiaoImediata.nome,
          regiaoIntermediaria: regiaoIntermediaria.nome,
        },
        {
          id: regiaoIntermediaria.id,
          nome: regiaoIntermediaria.nome,
          uf: uf.sigla,
        },
        populacao,
        eCapital
      );
    });
  }
}
