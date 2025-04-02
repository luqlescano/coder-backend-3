import { Router } from 'express';
import { userController } from './user.controller.js';

const router = Router();

router.get('/', userController.getAll);
router.post('/mocks/:amount', userController.createUsersMocks);
router.post('/generateData', userController.generateData);

export default router;