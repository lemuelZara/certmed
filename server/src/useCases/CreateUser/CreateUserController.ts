import { Request, Response } from 'express';

import { CreateUser } from './CreateUser';

export class CreateUserController {
  constructor(private createUser: CreateUser) {}

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const user = this.createUser.execute({ name, email, password });

    return response.status(201).json(user);
  }
}
