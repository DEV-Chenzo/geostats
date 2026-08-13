import type { IDadosDeRegiao } from "../repositories/IDadosDeRegiao";

export class Estado {
  constructor(
    public readonly id: number,
    public readonly sigla: string,
    public readonly nome: string,
    public readonly regiao: IDadosDeRegiao,
  ) {}
}
