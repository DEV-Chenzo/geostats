import type { IDadosDeRegiaoImediata } from "../repositories/IDadosDeRegiaoImediata.ts";
import type { IDadosDeRegiaoIntermediaria } from "../repositories/IDadosDeRegiaoIntermediaria.ts";

export class Municipio {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    public readonly regiaoImediata?: IDadosDeRegiaoImediata,
    public readonly regiaoIntermediaria?: IDadosDeRegiaoIntermediaria,
    public readonly populacao?: number | Promise<number>,
    public readonly èCapital?: boolean,
  ) {}

}
