import { Venda } from "../entities/Venda";

export interface IVendasRepository {
  criar(venda: Venda): Promise<Venda>;
  // Outros métodos como listar/obter podem ser adicionados conforme necessidade
}
