import service from '../services/auth-service.js';

const signup = async (req, res) => {
	try {
		const userData = req.body;

		res.status(201).json(await service.signup(userData));
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const login = async (req, res) => {
	try {
		const loginData = req.body;

		res.json(await service.login(loginData));
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const authenticate = async (req, res, next) => {
	try {
		req.user = await service.authenticate(req.get('Authorization'));

		next();
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default { signup, login, authenticate };
