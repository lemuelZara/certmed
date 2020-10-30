import { Patient } from '../../entities/Patient';

import AppError from '../../errors/AppError';

import { BCryptHashProvider } from '../../providers/HashProvider/BCryptHashProvider';
import IHashProvider from '../../providers/HashProvider/IHashProvider';

import IPatientRepository from '../../repositories/Patient/IPatientRepository';
import { PatientRepository } from '../../repositories/Patient/PatientRepository';

import ITypeRepository from '../../repositories/Type/ITypeRepository';
import { TypeRepository } from '../../repositories/Type/TypeRepository';

import IUserRepository from '../../repositories/User/IUserRepository';
import { UserRepository } from '../../repositories/User/UserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

export class CreatePatientService {
  private patientRepository: IPatientRepository;

  private userRepository: IUserRepository;

  private typeRepository: ITypeRepository;

  private hashProvider: IHashProvider;

  constructor(
    patientRepository: PatientRepository,
    userRepository: UserRepository,
    typeRepository: TypeRepository,
    hashProvider: BCryptHashProvider,
  ) {
    this.patientRepository = patientRepository;
    this.userRepository = userRepository;
    this.typeRepository = typeRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ name, email, password }: Request): Promise<Patient> {
    const findType = await this.typeRepository.findByTypeName('Paciente');
    const emailIsBeingUsed = await this.userRepository.findByEmail(email);

    if (findType === undefined) {
      throw new AppError('O tipo de usuário não existe');
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

    const patient = await this.patientRepository.create({ user });

    return patient;
  }
}
