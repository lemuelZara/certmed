import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository';

export class PostgresUserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {}

  async save(user: User): Promise<void> {}
}
