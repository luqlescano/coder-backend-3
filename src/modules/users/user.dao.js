import { userModel } from './user.model.js';

class UserDao {
  async create(data) {
    if (Array.isArray(data)) {
      return await userModel.insertMany(data);
    } else {
      return await userModel.create(data);
    }
  }

  async getAll() {
    return await userModel.find();
  }

  async getOne(query) {
    return await userModel.findOne(query).populate('pets');
  }

  async update(id, data) {
    return await userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id) {
    return await userModel.findByIdAndDelete(id);
  }

  async deleteMany() {
    return await userModel.deleteMany();
  }
}

export const userDao = new UserDao();