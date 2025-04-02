import { Router } from 'express';
import { generateUsers, generatePets } from './mockingModule.js';
import { userService } from '../users/user.service.js';
import { petService } from '../pets/pet.service.js';
import { logger } from '../../common/utils/logger.js';
import { InternalServerError, BadRequestError } from '../../common/errors/errors.js';

const router = Router();

router.get('/mockingpets', (req, res, next) => {
  try {
    const pets = generatePets(50); // Generar 50 mascotas ficticias como ejemplo
    res.status(200).json(pets);
  } catch (error) {
    logger.error('Error al generar mascotas ficticias:', error);
    next(new InternalServerError());
  }
});

router.get('/mockingusers', (req, res, next) => {
  try {
    const users = generateUsers(50); // Generar 50 usuarios ficticios
    res.status(201).json(users);
  } catch (error) {
    logger.error('Error al generar usuarios ficticios:', error);
    next(new InternalServerError());
  }
});

router.post('/generateData', async (req, res, next) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return next(new BadRequestError('Missing users or pets parameter'));
    }

    const generatedUsers = generateUsers(users);
    const generatedPets = generatePets(pets);

    await userService.insertManyUsers(generatedUsers);
    await petService.insertManyPets(generatedPets);

    res.status(201).json({ message: 'Data generated successfully', users: generatedUsers.length, pets: generatedPets.length });
  } catch (error) {
    logger.error('Error al generar datos:', error);
    next(new InternalServerError());
  }
});

router.delete('/deleteAllPets', async (req, res, next) => {
  try {
    await petService.deleteAllPets();
    res.status(200).json({ message: 'All pets deleted successfully' });
  } catch (error) {
    logger.error('Error al eliminar todos los pets:', error);
    next(new InternalServerError());
  }
});

router.delete('/deleteAllUsers', async (req, res, next) => {
  try {
    await userService.deleteAllUsers();
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error) {
    logger.error('Error al eliminar todos los users:', error);
    next(new InternalServerError());
  }
});

export default router;