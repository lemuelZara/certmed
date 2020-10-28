import { Router } from 'express';
import { DoctorController } from '../controllers/DoctorController';

const doctorRoutes = Router();

const doctorController = new DoctorController();

doctorRoutes.post('/doctors', doctorController.create);

export { doctorRoutes };
