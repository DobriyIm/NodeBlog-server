import { Schema, model } from 'mongoose';
import validators from 'mongoose-validators';

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
			required: false,
			validate: [
				validators.maxLength(5),
				'Max length must be less than 5 elements'
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
