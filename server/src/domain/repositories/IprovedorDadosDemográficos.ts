// domain/repositories/IProvedorDadosDemograficos.ts
import { Estado } from '../entities/Estado';
import { Municipio } from '../entities/Municipio';

export interface IProvedorDadosDemograficos {
  buscarEstados(): Promise<Estado[]>;
  buscarEstadosPorRegiao(idRegiao: number): Promise<Estado[]>;
  buscarMunicipiosPorEstado(siglaEstado: string): Promise<Municipio[]>;
  buscarPopulacaoMunicipio(idMunicipio: number): Promise<number>;
}