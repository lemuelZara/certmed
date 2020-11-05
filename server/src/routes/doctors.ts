import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import { DoctorController } from '../controllers/DoctorController';
import { AppointmentController } from '../controllers/AppointmentController';

import ensureAuthentication from '../middlewares/EnsureAuthentication';
import authenticationDoctor from '../middlewares/AuthenticationDoctor';

import storageConfig from '../config/storage';

const doctorRoutes = Router();
const upload = multer(storageConfig.multer);

const doctorController = new DoctorController();
const appointmentController = new AppointmentController();

doctorRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  doctorController.create,
);

doctorRoutes.use(ensureAuthentication);
doctorRoutes.get('/profile', authenticationDoctor, (req, res) => {
  return res.json(req.user);
});
doctorRoutes.post(
  '/appointments',
  authenticationDoctor,
  upload.single('document'),
  appointmentController.create,
);
doctorRoutes.get('/appointments');

export { doctorRoutes };
