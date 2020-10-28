import { Type } from '../../entities/Type';
import ITypeRepository from '../../repositories/Type/ITypeRepository';
import { TypeRepository } from '../../repositories/Type/TypeRepository';

interface Request {
  name: string;
}

export class FindSpecificTypeService {
  private typeRepository: ITypeRepository;

  constructor(typeRepository: TypeRepository) {
    this.typeRepository = typeRepository;
  }

  public async execute({ name }: Request): Promise<Type | undefined> {
    const type = await this.typeRepository.findByTypeName(name);

    return type;
  }
}
