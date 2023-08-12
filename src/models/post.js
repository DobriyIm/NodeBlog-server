import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		images: {
			type: [String],
			validate: [
				arr => arr.length <= 5,
				'{PATH} exceeds the limit of 5'
			]
		},
		userId: {
			type: ObjectId,
			ref: 'User',
			required: true
		},
		likes: {
			type: Number,
			default: 0
		},
		dislikes: {
			type: Number,
			default: 0
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

const Post = model('Post', postSchema);

export default Post;
