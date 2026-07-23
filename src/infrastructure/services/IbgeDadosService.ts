import { IProvedorDadosDemograficos } from "@/domain/repositories/IprovedorDadosDemográficos";
import { Estado } from "@/domain/entities/Estado";
import { Municipio } from "@/domain/entities/Municipio";
import { EstadoIbge } from "@/domain/repositories/IEstadosIbge";
import { MunicipioIbge } from "@/domain/repositories/IMunicipioIbge";

export class IbgeDadosService implements IProvedorDadosDemograficos {
  private readonly baseUrl: string = "https://servicodados.ibge.gov.br/api";

  async buscarEstados(): Promise<Estado[]> {
    const response = await fetch(
      `${this.baseUrl}/v1/localidades/estados?orderBy=nome`,
    );
    const data = await response.json();
    return data.map((est: EstadoIbge) => new Estado(est.id, est.sigla, est.nome, est.regiao));
  }

  async buscarEstadosPorRegiao(idRegiao: number): Promise<Estado[]> {
    const response = await fetch(
      `${this.baseUrl}/v1/localidades/regioes/${idRegiao}/estados`,
    );
    const data = await response.json();
    return data.map((est: EstadoIbge ) => new Estado(est.id, est.sigla, est.nome, est.regiao));  }

  async buscarMunicipiosPorEstado(siglaEstado: string): Promise<Municipio[]> {
    const response = await fetch(
      `${this.baseUrl}/v1/localidades/estados/${siglaEstado}/municipios`,
    );
    const data = await response.json();
    return data.map((mun: MunicipioIbge) => new Municipio(mun.id, mun.nome));
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
}
