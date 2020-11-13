import { getRepository, Repository } from 'typeorm';

import ICreateAppointmentDTO from '../../dto/ICreateAppointmentDTO';
import { Appointment } from '../../entities/Appointment';
import IAppointmentRepository from './IAppointmentRepository';

export class AppointmentRepository implements IAppointmentRepository {
  public ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDoctorId(id: number): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      relations: [
        'doctor',
        'doctor.user',
        'patient',
        'patient.user',
        'document',
      ],
      where: {
        doctor: id,
      },
    });

    return appointments;
  }

  public async findByPatientId(id: number): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      relations: [
        'doctor',
        'doctor.user',
        'patient',
        'patient.user',
        'document',
      ],
      where: {
        patient: id,
      },
    });

    return appointments;
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
