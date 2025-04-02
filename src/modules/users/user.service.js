import { userDao } from './user.dao.js';
import { generateUsers } from '../mocks/mockingModule.js';

class UserService {
  async getAllUsers() {
    return await userDao.getAll();
  }

  async insertManyUsers(users) {
    return await userDao.create(users);
  }

  async createUsersMocks(amount) {
    const users = generateUsers(amount);
    return await userDao.create(users);
  }

  async deleteAllUsers() {
    return await userDao.deleteMany({});
  }
}

export const userService = new UserService();