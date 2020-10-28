import { Type } from '../../entities/Type';
import ITypeRepository from '../../repositories/Type/ITypeRepository';
import { TypeRepository } from '../../repositories/Type/TypeRepository';

interface Request {
  name: string;
}

export class CreateTypeService {
  private typeRepository: ITypeRepository;

  constructor(typeRepository: TypeRepository) {
    this.typeRepository = typeRepository;
  }

  public async execute({ name }: Request): Promise<Type> {
    const type = await this.typeRepository.create({ name });

    return type;
  }
}
