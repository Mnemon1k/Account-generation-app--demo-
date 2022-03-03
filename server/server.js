require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./router/index');
const errorMiddlewareuter = require('./middelwares/error-middleware');

const PORT = process.env.PORT || '8000';
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(errorMiddlewareuter);

const startExpressServer = async () => {
	try {
		await mongoose.connect(
			process.env.DB_URL,
			{ useUnifiedTopology: true, useNewUrlParser: true },
			function (err) {
				if (err) return console.log(err);
			},
		);

		app.listen(PORT, () => {
			console.log(`App runs on port: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startExpressServer();
