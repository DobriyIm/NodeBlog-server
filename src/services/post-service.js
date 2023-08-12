import Post from '../models/post.js';
import User from '../models/user.js';

const createOne = async postData => {
	try {
		const { userId } = postData;

		const existingUser = await User.findById(userId);

		if (!existingUser) {
			throw {
				status: 404,
				message: `User with id '${userId}' not found`
			};
		}

		const newPost = await Post.create(postData);

		await existingUser.updateOne({ $push: { posts: newPost.id } });

		return newPost;
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const getOne = async id => {
	try {
		const foundPost = await Post.findById(id);

		if (!foundPost) {
			throw {
				status: 404,
				message: `Post with id '${id}' not found`
			};
		}

		return foundPost;
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const getAll = async () => {
	try {
		return await Post.find().lean();
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const deleteOne = async id => {
	try {
		const foundPost = await Post.findById(id);

		if (!foundPost) {
			throw {
				status: 404,
				message: `Post with id '${id}' not found`
			};
		}

		const publisher = await User.findById(foundPost.userId);

		await publisher.updateOne({
			$pull: { posts: foundPost.id }
		});

		await foundPost.deleteOne();
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
