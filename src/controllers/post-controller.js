import service from '../services/post-service.js';

const createOne = async (req, res) => {
	try {
		const postData = req.body;

		res.status(201).json(await service.createOne(postData));
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getOne = async (req, res) => {
	try {
		const { id } = req.params;

		res.status(200).json(await service.getOne(id));
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAll = async (req, res) => {
	try {
		res.status(200).json(await service.getAll());
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteOne = async (req, res) => {
	try {
		const { id } = req.params;

		res.status(204).json(await service.deleteOne(id));
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export default {
	createOne,
	getOne,
	getAll,
	deleteOne
};
