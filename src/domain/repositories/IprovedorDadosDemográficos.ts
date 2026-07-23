// domain/repositories/IProvedorDadosDemograficos.ts
import { Estado } from '../entities/Estado';
import { Municipio } from '../entities/Municipio';

export interface IProvedorDadosDemograficos {
  buscarEstados(): Promise<Estado[]>;
  buscarEstadosPorRegiao(idRegiao: number): Promise<Estado[]>;
  buscarMunicipiosPorEstado(siglaEstado: string): Promise<Municipio[]>;
//   buscarMunicipiosPorRegiao(siglaRegiao: string): Promise<Municipio[]>;
//   buscarMunicipiosPorRegiaoImediata(nomeOuIdRegiaoImediata: string | number): Promise<Municipio[]>;
//   buscarMunicipiosPorRegiaoIntermediaria(nomeOuIdRegiaoIntermediaria: string | number): Promise<Municipio[]>;
  buscarPopulacaoMunicipio(idMunicipio: number): Promise<number>;
}