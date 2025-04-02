import { faker } from '@faker-js/faker';
import { hashPassword } from '../../common/utils/bcrypt.js';

export const generateUsers = (num) => {
  return Array.from({ length: num }, () => ({
    // _id: faker.string.uuid(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: hashPassword('coder123'),
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: [],
  }));
};

const getSpecie = (type) => {
  switch (type) {
    case 'perro':
      return 'canino';
    case 'gato':
      return 'felino';
    case 'ave':
      return 'aviar';
    case 'pez':
      return 'acuatico';
    default:
      return 'desconocido/a';
  }
};

export const generatePets = (num) => {
  return Array.from({ length: num }, () => {
    const type = faker.helpers.arrayElement(['perro', 'gato', 'ave', 'pez']);
    return {
      // _id: faker.string.uuid(),
      name: faker.person.firstName(),
      type,
      specie: getSpecie(type),
      age: faker.number.int({ min: 1, max: 15 }),
    };
  });
};