const EmailModel = require('../models/emailModel');
const emailService = require('../service/email-service');

class emailController {
	async add(req, res, next) {
		try {
			if (Array.isArray(req.body)) {
				const emails = await emailService.create(req.body);

				console.log('Почты успешно сохранены');
				res.status(200).json({ statusCode: 200, payload: emails });
			} else {
				res
					.status(400)
					.json({ statusCode: 400, message: 'Переданы не верные данные, необходим массив почт.' });
			}
		} catch (error) {
			next(error);
		}
	}
	async delete(req, res, next) {
		try {
			var { name } = req.body;
			await EmailModel.findOneAndDelete({ name });
			res.status(200).json({ statusCode: 200 });
		} catch (error) {
			next(error);
		}
	}
	async update(req, res, next) {
		try {
			var { name, free } = req.body;
			await EmailModel.findOneAndUpdate({ name }, { free });
			res.status(200).json({ statusCode: 200 });
		} catch (error) {
			next(error);
		}
	}
	async getAll(req, res, next) {
		try {
			const emails = await emailService.getAll();
			res.status(200).json({ statusCode: 200, payload: emails });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new emailController();
