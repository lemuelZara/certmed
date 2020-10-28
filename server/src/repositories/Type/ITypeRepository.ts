import ICreateTypeDTO from '../../dto/ICreateTypeDTO';
import { Type } from '../../entities/Type';

export default interface ITypeRepository {
  show(): Promise<Type[]>;
  findByTypeName(name: string): Promise<Type | undefined>;
  create(data: ICreateTypeDTO): Promise<Type>;
}
