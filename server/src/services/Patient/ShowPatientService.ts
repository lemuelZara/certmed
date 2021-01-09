import { Patient } from '../../entities/Patient';
import IPatientRepository from '../../repositories/Patient/IPatientRepository';
import { PatientRepository } from '../../repositories/Patient/PatientRepository';

export class ShowPatientService {
  private patientRepository: IPatientRepository;

  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  public async execute(): Promise<Patient[]> {
    const patients = await this.patientRepository.show();

    return patients;
  }
}
