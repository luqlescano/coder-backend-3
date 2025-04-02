import { Router } from 'express';
import { petController } from './pet.controller.js';

const router = Router();

router.get('/', petController.getAll);
router.post('/mocks/:amount', petController.createPetsMocks);
router.post('/generateData', petController.generateData);

export default router;