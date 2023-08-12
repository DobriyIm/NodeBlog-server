import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const commentShema = new Schema(
	{
		text: {
			type: String,
			required: true
		},
		userId: {
			type: ObjectId,
			ref: 'User',
			required: true
		},
		postId: {
			type: ObjectId,
			ref: 'Post',
			required: true
		},
		likes: {
			type: Number,
			default: 0
		},
		deslikes: {
			type: Number,
			default: 0
		}
	},
	{
		versionKey: false,
		timestamps: true
	}
);

const Comment = model('Comment', commentShema);

export default Comment;
