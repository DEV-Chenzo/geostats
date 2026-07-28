import type { IDadosDeRegiaoImediata } from "../repositories/IDadosDeRegiaoImediata";
import type { IDadosDeRegiaoIntermediaria } from "../repositories/IDadosDeRegiaoIntermediaria";

export class Municipio {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    public readonly regiaoImediata?: IDadosDeRegiaoImediata,
    public readonly regiaoIntermediaria?: IDadosDeRegiaoIntermediaria,
    public readonly regiao?: string,
    public readonly capital?: boolean,
    public populacao?: number,
  ) {}

  public atualizarPopulacao(quantidade: number): void {
    if (quantidade < 0) throw new Error("População não pode ser negativa.");
    this.populacao = quantidade;
  }
}
