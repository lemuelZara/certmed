import { Appointment } from '../../entities/Appointment';
import { AppointmentRepository } from '../../repositories/Appointment/AppointmentRepository';
import IAppointmentRepository from '../../repositories/Appointment/IAppointmentRepository';

interface Request {
  id: number;
}

export class ListAppointmentDoctorService {
  private appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute({ id }: Request): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findByDoctorId(id);

    return appointments;
  }
}
