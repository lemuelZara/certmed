import { getRepository, Repository } from 'typeorm';

import { Doctor } from '../../entities/Doctor';
import IDoctorRepository from './IDoctorRepository';
import ICreateDoctorDTO from '../../dto/ICreateDoctorDTO';

export class DoctorRepository implements IDoctorRepository {
  private ormRepository: Repository<Doctor>;

  constructor() {
    this.ormRepository = getRepository(Doctor);
  }

  public async create({ user }: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = this.ormRepository.create({ user });

    await this.ormRepository.save(doctor);

    return doctor;
  }
}
