import { Router } from 'express';

import { typeRoutes } from './types';
import { doctorRoutes } from './doctors';
import { patientRoutes } from './patients';

const routes = Router();

routes.use(typeRoutes);
routes.use(doctorRoutes);
routes.use(patientRoutes);

export { routes };
