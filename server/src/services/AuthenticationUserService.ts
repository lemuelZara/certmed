import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import { User } from '../entities/User';

import AppError from '../errors/AppError';

import { BCryptHashProvider } from '../providers/HashProvider/BCryptHashProvider';
import IHashProvider from '../providers/HashProvider/IHashProvider';

import IUserRepository from '../repositories/User/IUserRepository';
import { UserRepository } from '../repositories/User/UserRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

export class AuthenticationUserService {
  private userRepository: IUserRepository;

  private hashProvider: IHashProvider;

  constructor(
    userRepository: UserRepository,
    hashProvider: BCryptHashProvider,
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email e/ou password inválidos!', 401);
    }

    const passwordCompare = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordCompare) {
      throw new AppError('Email e/ou password inválidos!', 401);
    }

    const token = sign({}, authConfig.secretKey, {
      subject: `${user.id}`,
      expiresIn: authConfig.expiresIn,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}
