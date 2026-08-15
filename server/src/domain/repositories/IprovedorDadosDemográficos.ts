// domain/repositories/IProvedorDadosDemograficos.ts
import { Estado } from '../entities/Estado.ts';
import { Municipio } from '../entities/Municipio.ts';

export interface IProvedorDadosDemograficos {
  buscarEstados(): Promise<Estado[]>;
  buscarEstadosPorRegiao(idRegiao: number): Promise<Estado[]>;
  buscarMunicipiosPorEstado(siglaEstado: string): Promise<Municipio[]>;
  buscarPopulacaoMunicipio(idMunicipio: number): Promise<number>;
}