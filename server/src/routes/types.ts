import { Router } from 'express';

import { TypeController } from '../controllers/TypeController';

const typeRoutes = Router();

const typeController = new TypeController();

typeRoutes.post('/', typeController.create);
typeRoutes.get('/', typeController.index);

export { typeRoutes };
