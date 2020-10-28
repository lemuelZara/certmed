import { Request, Response } from 'express';
import { BCryptHashProvider } from '../providers/HashProvider/BCryptHashProvider';

import { DoctorRepository } from '../repositories/Doctor/DoctorRepository';
import { TypeRepository } from '../repositories/Type/TypeRepository';
import { UserRepository } from '../repositories/User/UserRepository';
import { CreateDoctorService } from '../services/Doctor/CreateDoctorService';

export class DoctorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const doctorRepository = new DoctorRepository();
    const userRepository = new UserRepository();
    const typeRepository = new TypeRepository();
    const hashProvider = new BCryptHashProvider();

    const doctorService = new CreateDoctorService(
      doctorRepository,
      userRepository,
      typeRepository,
      hashProvider,
    );

    const doctor = await doctorService.execute({ name, email, password });

    return response.status(201).json(doctor);
  }
}
