export type MunicipioIbge = {
  id: number;
  nome: string;

  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: {
        id: number;
        nome: string;
        sigla: string;
      };
    };
  };

  "regiao-imediata": {
    id: number;
    nome: string;

    "regiao-intermediaria": {
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


