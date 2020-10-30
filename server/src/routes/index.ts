import { Router } from 'express';

import { typeRoutes } from './types';
import { doctorRoutes } from './doctors';
import { patientRoutes } from './patients';
import { sessionsRoutes } from './sessions';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/types', typeRoutes);
routes.use('/doctors', doctorRoutes);
routes.use('/patients', patientRoutes);

export { routes };
