import { Patient } from '../../entities/Patient';
import ICreatePatientDTO from '../../dto/ICreatePatientDTO';

export default interface IPatientRepository {
  findById(id: number): Promise<Patient | undefined>;
  create(data: ICreatePatientDTO): Promise<Patient>;
}
