import crypto from 'crypto';
import Post from '../models/post.js';
import User from '../models/user.js';
import { hashPassword } from '../utils.js';

const createOne = async userData => {
	try {
		const { email } = userData;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw {
				status: 409,
				message: `User with email '${email}' already exists`
			};
		}

		const salt = crypto.randomBytes(16);
		const hashedPassword = await hashPassword(
			userData.password,
			salt,
			1000,
			32,
			'sha512'
		);

		userData.password = hashedPassword.toString('hex');
		userData.salt = salt.toString('hex');

		return await User.create(userData);
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const getOne = async id => {
	try {
		const foundUser = await User.findById(id);

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

const getAll = async () => {
	try {
		return await User.find().lean();
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const deleteOne = async id => {
	try {
		const foundUser = await User.findById(id);

		if (!foundUser) {
			throw {
				status: 404,
				message: `User with id '${id}' not found`
			};
		}

		await Post.deleteMany({ userId: id });

		await foundUser.deleteOne();
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

export default {
	createOne,
	getOne,
	getAll,
	deleteOne
};
