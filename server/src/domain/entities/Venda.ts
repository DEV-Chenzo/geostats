export type Localizacao = {
  id: number;
  nome: string;
  uf: string;
  populacao?: number;
  eCapital?: boolean;
};

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
