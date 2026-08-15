import type { IDadosDeRegiao } from "../repositories/IDadosDeRegiao.ts";

export class Estado {
  constructor(
    public readonly id: number,
    public readonly sigla: string,
    public readonly nome: string,
    public readonly regiao: IDadosDeRegiao,
  ) {}
}
