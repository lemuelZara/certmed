import { Router } from 'express';
import { PatientController } from '../controllers/PatientController';

const patientRoutes = Router();

const patientController = new PatientController();

patientRoutes.post('/patients', patientController.create);

export { patientRoutes };
