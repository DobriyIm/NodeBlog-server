import { Schema, model } from 'mongoose';

const userShema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		surname: {
			type: String,
			requried: true
		},
		email: {
			type: String,
			required: true,
			index: { unique: true }
		},
		password: {
			type: String,
			required: true
		},
		salt: {
			type: String,
			requried: true
		}
	},
	{
		versionKey: false,
		timestamps: true
	}
);

const User = model('User', userShema);

export default User;
