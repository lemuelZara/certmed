import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';

import { UserRepository } from '../repositories/User/UserRepository';
import { FindUserTypeService } from '../services/FindUserTypeService';

export default async function authenticationPatient(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;

  const userRepository = new UserRepository();
  const findUserTypeService = new FindUserTypeService(userRepository);

  const findType = await findUserTypeService.execute({ id });

  if (!findType.type.name.includes('Paciente')) {
    throw new AppError('Acesso negado!', 403);
  }

  return next();
}
