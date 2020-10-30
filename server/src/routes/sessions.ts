import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { SessionController } from '../controllers/SessionController';

const sessionsRoutes = Router();

const sessionController = new SessionController();

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export { sessionsRoutes };
