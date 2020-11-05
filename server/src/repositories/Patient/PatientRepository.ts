import { getRepository, Repository } from 'typeorm';

import { Patient } from '../../entities/Patient';
import ICreatePatientDTO from '../../dto/ICreatePatientDTO';
import IPatientRepository from './IPatientRepository';

export class PatientRepository implements IPatientRepository {
  private ormRepository: Repository<Patient>;

  constructor() {
    this.ormRepository = getRepository(Patient);
  }

  public async findById(id: number): Promise<Patient | undefined> {
    const patient = await this.ormRepository.findOne({
      relations: ['user'],
      where: {
        user: id,
      },
    });

    return patient;
  }

  public async create({ user }: ICreatePatientDTO): Promise<Patient> {
    const patient = this.ormRepository.create({ user });

    await this.ormRepository.save(patient);

    return patient;
  }
}
