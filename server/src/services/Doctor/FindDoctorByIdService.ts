import { Doctor } from '../../entities/Doctor';
import AppError from '../../errors/AppError';
import { DoctorRepository } from '../../repositories/Doctor/DoctorRepository';
import IDoctorRepository from '../../repositories/Doctor/IDoctorRepository';

interface Request {
  id: number;
}

export class FindDoctorByIDService {
  private doctorRepository: IDoctorRepository;

  constructor(doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  public async execute({ id }: Request): Promise<Doctor> {
    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      throw new AppError('Doutor não encontrado!');
    }

    return doctor;
  }
}
