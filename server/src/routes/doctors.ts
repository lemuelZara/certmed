import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { DoctorController } from '../controllers/DoctorController';

import ensureAuthentication from '../middlewares/EnsureAuthentication';
import authenticationDoctor from '../middlewares/AuthenticationDoctor';

const doctorRoutes = Router();

const doctorController = new DoctorController();

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

export { doctorRoutes };
