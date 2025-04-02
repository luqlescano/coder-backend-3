import { petDao } from './pet.dao.js';
import { generatePets } from '../mocks/mockingModule.js';

class PetService {
  async getAllPets() {
    return await petDao.getAll();
  }

  async insertManyPets(pets) {
    return await petDao.create(pets);
  }

  async createPetsMocks(amount) {
    const pets = generatePets(amount);
    return await petDao.create(pets);
  }

  async deleteAllPets() {
    return await petDao.deleteMany({});
  }
}

export const petService = new PetService();