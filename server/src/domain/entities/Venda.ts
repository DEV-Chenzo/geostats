import type { Localizacao } from "../repositories/ILocalizaçãoDeVendas.ts";

export class Venda {
  constructor(
    public cliente: string,
    public valor: number,
    public item: string,
    public dataVenda: Date,
    public localizacao: Localizacao,
    public id?: number,
  ) {}
}
