import { Doctor } from '../../entities/Doctor';

import AppError from '../../errors/AppError';

import { BCryptHashProvider } from '../../providers/HashProvider/BCryptHashProvider';
import IHashProvider from '../../providers/HashProvider/IHashProvider';

import { DoctorRepository } from '../../repositories/Doctor/DoctorRepository';
import IDoctorRepository from '../../repositories/Doctor/IDoctorRepository';

import ITypeRepository from '../../repositories/Type/ITypeRepository';
import { TypeRepository } from '../../repositories/Type/TypeRepository';

import IUserRepository from '../../repositories/User/IUserRepository';
import { UserRepository } from '../../repositories/User/UserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

export class CreateDoctorService {
  private doctorRepository: IDoctorRepository;

  private userRepository: IUserRepository;

  private typeRepository: ITypeRepository;

  private hashProvider: IHashProvider;

  constructor(
    doctorRepository: DoctorRepository,
    userRepository: UserRepository,
    typeRepository: TypeRepository,
    hashProvider: BCryptHashProvider,
  ) {
    this.doctorRepository = doctorRepository;
    this.userRepository = userRepository;
    this.typeRepository = typeRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ name, email, password }: Request): Promise<Doctor> {
    const findType = await this.typeRepository.findByTypeName('Médico');
    const emailIsBeingUsed = await this.userRepository.findByEmail(email);

    if (!findType) {
      throw new AppError('O tipo de usuário não existe!');
    }

    if (emailIsBeingUsed) {
      throw new AppError('O Email já está sendo usado!');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
      type: findType,
    });

    const doctor = await this.doctorRepository.create({ user });

    return doctor;
  }
}
