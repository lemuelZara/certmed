import ICreateTypeDTO from './ICreateTypeDTO';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  type: ICreateTypeDTO;
}
