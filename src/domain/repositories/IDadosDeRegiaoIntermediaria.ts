export interface IDadosDeRegiaoIntermediaria {
  id: number;
  nome: string;
  UF: {
    id: number;
    nome: string;
    sigla: string;
  };
}
