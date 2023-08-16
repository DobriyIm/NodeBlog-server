import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export const JWT_OPTIONS = {
	expiresIn: process.env.JWT_EXPIRATION,
	noTimestamp: true
};

export const signJWT = promisify(jwt.sign);

export const verifyJWT = promisify(jwt.verify);

export const hashPassword = promisify(crypto.pbkdf2);
