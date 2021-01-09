import { Request, Response } from 'express';

import { BCryptHashProvider } from '../providers/HashProvider/BCryptHashProvider';

import { UserRepository } from '../repositories/User/UserRepository';

import { AuthenticationUserService } from '../services/AuthenticationUserService';

export class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const hashProvider = new BCryptHashProvider();

    const authenticationUser = new AuthenticationUserService(
      userRepository,
      hashProvider,
    );

    const { user, token } = await authenticationUser.execute({
      email,
      password,
    });

    return response.status(200).json({ user, token });
  }
}
