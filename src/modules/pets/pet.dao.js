import { petModel } from './pet.model.js';

class PetDao {
  async create(data) {
    if (Array.isArray(data)) {
      return await petModel.insertMany(data);
    } else {
      return await petModel.create(data);
    }
  }

  async getAll() {
    return await petModel.find();
  }

  async getOne(query) {
    return await petModel.findOne(query);
  }

  async update(id, data) {
    return await petModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id) {
    return await petModel.findByIdAndDelete(id);
  }

  async deleteMany() {
    return await petModel.deleteMany();
  }
}

export const petDao = new PetDao();