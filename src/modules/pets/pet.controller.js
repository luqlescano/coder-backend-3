import { request, response } from 'express';
import { petService } from './pet.service.js';
import { logger } from '../../common/utils/logger.js';
import { InternalServerError, BadRequestError } from '../../common/errors/errors.js';

class PetController {
  async getAll(req = request, res = response, next) {
    try {
      const pets = await petService.getAllPets();
      res.json(pets);
    } catch (error) {
      logger.error('Error al obtener todas las mascotas:', error);
      next(new InternalServerError());
    }
  }

  async createPetsMocks(req = request, res = response, next) {
    try {
      const { amount } = req.params;
      const pets = generatePets(amount);
      res.status(201).json(pets);
    } catch (error) {
      logger.error('Error al crear mascotas ficticias:', error);
      next(new InternalServerError());
    }
  }

  async generateData(req = request, res = response, next) {
    try {
      const { users, pets } = req.body;
      if (!users || !pets) {
        return next(new BadRequestError('Missing users or pets parameter'));
      }

      const generatedPets = generatePets(pets);

      await petService.insertManyPets(generatedPets);

      res.status(201).json({ message: 'Data generated successfully', pets: generatedPets.length });
    } catch (error) {
      logger.error('Error al generar datos:', error);
      next(new InternalServerError());
    }
  }
}

export const petController = new PetController();