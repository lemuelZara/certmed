import { getRepository, Repository } from 'typeorm';

import { Type } from '../../entities/Type';
import ITypeRepository from './ITypeRepository';
import ICreateTypeDTO from '../../dto/ICreateTypeDTO';

export class TypeRepository implements ITypeRepository {
  private ormRepository: Repository<Type>;

  constructor() {
    this.ormRepository = getRepository(Type);
  }

  public async show(): Promise<Type[]> {
    const types = await this.ormRepository.find();

    return types;
  }

  public async findByTypeName(name: string): Promise<Type | undefined> {
    const type = await this.ormRepository.findOne({ where: { name } });

    return type;
  }

  public async create({ name }: ICreateTypeDTO): Promise<Type> {
    const type = this.ormRepository.create({ name });

    await this.ormRepository.save(type);

    return type;
  }
}
