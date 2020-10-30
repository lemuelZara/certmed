import { User } from '../entities/User';

import AppError from '../errors/AppError';

import IUserRepository from '../repositories/User/IUserRepository';
import { UserRepository } from '../repositories/User/UserRepository';

interface Request {
  id: string;
}

export class FindUserTypeService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ id }: Request): Promise<User> {
    const user = await this.userRepository.findUserTypeById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado!');
    }

    return user;
  }
}
