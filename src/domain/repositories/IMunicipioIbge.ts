export type MunicipioIbge = {
  id: number;
  nome: string;
  regiaoImediata: {
    id: number;
    nome: string;
    regiaoIntermediaria: {
      id: number;
      nome: string;
      UF: {
        id: number;
        nome: string;
        sigla: string;
      };
    };
  };
};

