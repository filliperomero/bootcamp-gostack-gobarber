import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';
import redisConfig from './config/redis';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import ValidateUserStore from './app/Validators/UserStore';
import ValidateUserUpdate from './app/Validators/UserUpdate';
import ValidateSessionStore from './app/Validators/SessionStore';
import ValidateAppointmentStore from './app/Validators/AppointmentStore';

import authMiddlware from './app/middlewares/auth';

const routes = new Router();
const uploads = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: redisConfig.host,
  port: redisConfig.port,
});

const bruteForce = new Brute(bruteStore);

routes.post('/users', ValidateUserStore, UserController.store);
routes.post(
  '/sessions',
  bruteForce.prevent,
  ValidateSessionStore,
  SessionController.store
);

// All routes below here will need to send the token in the header
routes.use(authMiddlware);

routes.put('/users', ValidateUserUpdate, UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post(
  '/appointments',
  ValidateAppointmentStore,
  AppointmentController.store
);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', uploads.single('file'), FileController.store);

export default routes;
