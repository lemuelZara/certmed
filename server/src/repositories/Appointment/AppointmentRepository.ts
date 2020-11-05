import { getRepository, Repository } from 'typeorm';

import ICreateAppointmentDTO from '../../dto/ICreateAppointmentDTO';
import { Appointment } from '../../entities/Appointment';
import IAppointmentRepository from './IAppointmentRepository';

export class AppointmentRepository implements IAppointmentRepository {
  public ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    date,
    description,
    doctor,
    patient,
    document,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      date,
      description,
      doctor,
      patient,
      document,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}
