import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddlware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// All routes below here will need to send the token in the header
routes.use(authMiddlware);

routes.put('/users', UserController.update);

export default routes;
