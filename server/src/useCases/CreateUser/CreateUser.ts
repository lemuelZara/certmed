import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ICreateUserDTO } from './ICreateUserDTO';

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = new User(data);

    await this.userRepository.save(user);

    return user;
  }
}
