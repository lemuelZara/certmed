import ICreateDoctorDTO from '../../dto/ICreateDoctorDTO';
import { Doctor } from '../../entities/Doctor';

export default interface IDoctorRepository {
  create(data: ICreateDoctorDTO): Promise<Doctor>;
}
