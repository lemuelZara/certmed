import ICreateDoctorDTO from '../../dto/ICreateDoctorDTO';
import { Doctor } from '../../entities/Doctor';

export default interface IDoctorRepository {
  findById(id: number): Promise<Doctor | undefined>;
  create(data: ICreateDoctorDTO): Promise<Doctor>;
}
