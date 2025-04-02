import jwt from 'jsonwebtoken';
import envsConfig from '../../config/envs.config.js';

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, envsConfig.JWT_PRIVATE_KEY, { expiresIn: envsConfig.JWT_EXPIRES_TIME_TOKEN });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, envsConfig.JWT_PRIVATE_KEY);
    } catch (error) {
        return null;
    }
};