import ICreateUserDTO from '../../dto/ICreateUserDTO';
import { User } from '../../entities/User';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
}
