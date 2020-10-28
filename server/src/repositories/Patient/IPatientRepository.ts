import { Patient } from '../../entities/Patient';
import ICreatePatientDTO from '../../dto/ICreatePatientDTO';

export default interface IPatientRepository {
  create(data: ICreatePatientDTO): Promise<Patient>;
}
