const EmailModel = require('../models/emailModel');
const ApiError = require('../exceptions/api-error');

class EmailSrvice {
	async create(payload) {
		try {
			return await EmailModel.insertMany(payload);
		} catch (error) {
			if (error.code === 11000) {
				throw ApiError.BadRequest('Одна из почт уже в базе.', error);
			} else {
				throw ApiError.BadRequest('Ошибка добавления почт в базу.', error);
			}
		}
	}
	async getFreeEmail() {
		// return await EmailModel.findOneAndUpdate({ free: true });
		return await EmailModel.findOneAndUpdate({ free: true }, { free: false }, { new: true });
	}
	async getAll() {
		return await EmailModel.find();
	}
}

module.exports = new EmailSrvice();
