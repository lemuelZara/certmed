import { Type } from '../../entities/Type';
import ITypeRepository from '../../repositories/Type/ITypeRepository';
import { TypeRepository } from '../../repositories/Type/TypeRepository';

export class ShowTypeService {
  private typeRepository: ITypeRepository;

  constructor(typeRepository: TypeRepository) {
    this.typeRepository = typeRepository;
  }

  public async execute(): Promise<Type[]> {
    const type = await this.typeRepository.show();

    return type;
  }
}
