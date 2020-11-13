import { Patient } from '../../entities/Patient';
import AppError from '../../errors/AppError';
import IPatientRepository from '../../repositories/Patient/IPatientRepository';
import { PatientRepository } from '../../repositories/Patient/PatientRepository';

interface Request {
  id: number;
}

export class FindPatientByIdService {
  private patientRepository: IPatientRepository;

  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  public async execute({ id }: Request): Promise<Patient> {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new AppError('Paciente não encontrado!');
    }

    return patient;
  }
}
