import ICreateUserDTO from '../../dto/ICreateUserDTO';
import { User } from '../../entities/User';

export default interface IUserRepository {
  findUserTypeById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
}
