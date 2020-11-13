import ICreateAppointmentDTO from '../../dto/ICreateAppointmentDTO';
import { Appointment } from '../../entities/Appointment';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDoctorId(id: number): Promise<Appointment[]>;
  findByPatientId(id: number): Promise<Appointment[]>;
}
