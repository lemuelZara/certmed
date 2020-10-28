import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import IUserRepository from './IUserRepository';
import ICreateUserDTO from '../../dto/ICreateUserDTO';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
    type,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password, type });

    await this.ormRepository.save(user);

    return user;
  }
}
