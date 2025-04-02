import express from 'express';
import envsConfig from './config/envs.config.js';
import { connectDB } from './config/mongodb.config.js';
import router from './common/router.js';
import { customError } from './common/errors/customError.js';
import { logger } from './common/utils/logger.js';

const app = express();

connectDB().catch((error) => {
    logger.error('Hubo un error al querer conectar con MongoDB Atlas:', error);
    process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(customError);

app.listen(envsConfig.PORT, () => {
    logger.info(`Servidor activo en http://localhost:${envsConfig.PORT}`);
});