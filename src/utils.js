import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export const JWT_OPTIONS = {
	expiresIn: process.env.JWT_EXPIRATION,
	noTimestamp: true
};

export const signJWT = promisify(jwt.sign);

export const verifyJWT = promisify(jwt.verify);

export const genSalt = promisify(bcrypt.genSalt);

export const hashPassword = promisify(bcrypt.hash);

export const verifyPassword = promisify(bcrypt.compare);
