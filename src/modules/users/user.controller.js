import { request, response } from 'express';
import { userService } from './user.service.js';
import { logger } from '../../common/utils/logger.js';
import { InternalServerError, BadRequestError } from '../../common/errors/errors.js';

class UserController {
  async getAll(req = request, res = response, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      logger.error('Error al obtener todos los usuarios:', error);
      next(new InternalServerError());
    }
  }

  async createUsersMocks(req = request, res = response, next) {
    try {
      const { amount } = req.params;
      const users = generateUsers(amount);
      res.status(201).json(users);
    } catch (error) {
      logger.error('Error al crear usuarios ficticios:', error);
      next(new InternalServerError());
    }
  }

  async generateData(req = request, res = response, next) {
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
  }
}

export const userController = new UserController();