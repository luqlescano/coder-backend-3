import mongoose from 'mongoose';
import envsConfig from './envs.config.js';
import { logger } from '../common/utils/logger.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(envsConfig.MONGODB_URI);
    logger.info('Conexión con MongoDB Atlas exitosa.');
  } catch (error) {
    logger.error('Hubo un error al querer conectar con MongoDB Atlas:', error);
  }
}