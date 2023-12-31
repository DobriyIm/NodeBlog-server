import mongoose from 'mongoose';
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

mongoose
	.connect(process.env.CONNECTION_STRING)
	.then(() => {
		app.listen(PORT, () =>
			console.log(`API is listening on port ${PORT}`)
		);
	})
	.catch(err => console.log(err));
