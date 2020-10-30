import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { PatientController } from '../controllers/PatientController';

import ensureAuthentication from '../middlewares/EnsureAuthentication';
import authenticationPatient from '../middlewares/AuthenticationPatient';

const patientRoutes = Router();

const patientController = new PatientController();

patientRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  patientController.create,
);

patientRoutes.use(ensureAuthentication);
patientRoutes.get('/profile', authenticationPatient, (_, res) => {
  return res.json({ ok: true });
});

export { patientRoutes };
