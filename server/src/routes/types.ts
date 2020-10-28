import { Router } from 'express';
import { TypeController } from '../controllers/TypeController';

const typeRoutes = Router();

const typeController = new TypeController();

typeRoutes.post('/types', typeController.create);
typeRoutes.get('/types', typeController.index);

export { typeRoutes };
