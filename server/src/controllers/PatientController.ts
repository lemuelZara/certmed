import { Request, Response } from 'express';

import { BCryptHashProvider } from '../providers/HashProvider/BCryptHashProvider';

import { PatientRepository } from '../repositories/Patient/PatientRepository';
import { TypeRepository } from '../repositories/Type/TypeRepository';
import { UserRepository } from '../repositories/User/UserRepository';

import { CreatePatientService } from '../services/Patient/CreatePatientService';
import { ShowPatientService } from '../services/Patient/ShowPatientService';

export class PatientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const patientRepository = new PatientRepository();
    const userRepository = new UserRepository();
    const typeRepository = new TypeRepository();
    const hashProvider = new BCryptHashProvider();

    const patientService = new CreatePatientService(
      patientRepository,
      userRepository,
      typeRepository,
      hashProvider,
    );

    const patient = await patientService.execute({ name, email, password });

    delete patient.user.password;

    return response.status(201).json(patient);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const patientRepository = new PatientRepository();

    const patientService = new ShowPatientService(patientRepository);

    const patients = await patientService.execute();

    return response.status(200).json(patients);
  }
}
