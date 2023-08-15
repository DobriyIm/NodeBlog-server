import User from '../models/user.js';
import { JWT_OPTIONS, signJWT, verifyJWT } from '../utils.js';
import userService from './user-service.js';

const signup = async userData => {
	try {
		return await userService.createOne(userData);
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const login = async loginData => {
	try {
		const { login, password } = loginData;

		const foundUser = await User.findOne({ email: login }).lean();

		if (!foundUser) {
			throw {
				status: 404,
				message: `User with email ${login} not found.`
			};
		}
		if (password != foundUser.password) {
			throw {
				status: 400,
				message: 'Incorrect password'
			};
		}

		const token = await signJWT(
			{ sub: foundUser._id.toString() },
			process.env.JWT_SECRET_KEY,
			JWT_OPTIONS
		);

		return { token };
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const authenticate = async authHeader => {
	if (!authHeader) {
		throw {
			status: 401,
			message: 'Authorization header not provided'
		};
	}

	const tokenParts = authHeader.split(' ');
	if (tokenParts[0] != 'Bearer') {
		throw {
			status: 401,
			message: "Authorization scheme 'Bearer' required"
		};
	}

	const token = tokenParts[1];
	if (!token) {
		throw { status: 401, message: 'Token not provided' };
	}

	try {
		const { sub: id } = await verifyJWT(
			token,
			process.env.JWT_SECRET_KEY
		);

		const foundUser = await User.findById(id).lean();

		if (!foundUser) {
			throw {
				status: 404,
				message: `User with id '${id}' not found`
			};
		}

		return foundUser;
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

export default { signup, login, authenticate };
