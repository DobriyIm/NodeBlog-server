import Comment from '../models/comment.js';
import Post from '../models/post.js';
import User from '../models/user.js';

const createOne = async commentData => {
	try {
		const { postId, userId } = commentData;

		const existingPost = await Post.findById(postId);
		if (!existingPost) {
			throw {
				status: 404,
				message: `Post with id '${postId}' not found`
			};
		}

		const existingUser = await User.findById(userId);
		if (!existingUser) {
			throw {
				status: 404,
				message: `User with id '${userId}' not found`
			};
		}

		const newComment = await Comment.create(commentData);

		await existingPost.updateOne({
			$push: { comments: newComment.id }
		});

		return newComment;
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const getOne = async id => {
	try {
		const foundComment = await Comment.findById(id);

		if (!foundComment) {
			throw {
				status: 404,
				message: `Comment with id '${id}' not found`
			};
		}

		return foundComment;
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const getAll = async () => {
	try {
		return await Comment.find().lean();
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const deleteOne = async id => {
	try {
		const foundComment = await Comment.findById(id);

		if (!foundComment) {
			throw {
				status: 404,
				message: `Post with id '${id}' not found`
			};
		}

		const existingPost = await Post.findById(foundComment.postId);

		await existingPost.updateOne({
			$pull: { comments: id }
		});

		await foundComment.deleteOne();
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
