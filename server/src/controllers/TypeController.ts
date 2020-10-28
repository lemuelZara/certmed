import { Request, Response } from 'express';

import { TypeRepository } from '../repositories/Type/TypeRepository';

import { CreateTypeService } from '../services/Type/CreateTypeService';
import { ShowTypeService } from '../services/Type/ShowTypeService';

export class TypeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const typeRepository = new TypeRepository();
    const typeService = new CreateTypeService(typeRepository);

    const type = await typeService.execute({ name });

    return response.status(201).json(type);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const typeRepository = new TypeRepository();
    const typeService = new ShowTypeService(typeRepository);

    const type = await typeService.execute();

    return response.status(200).json(type);
  }
}
