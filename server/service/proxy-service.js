const ProxyModel = require('../models/proxyModel');
const ApiError = require('../exceptions/api-error');

class ProxySrvice {
	async create(payload) {
		try {
			return await ProxyModel.insertMany(payload);
		} catch (error) {
			if (error.code === 11000) {
				throw ApiError.BadRequest('Один из прокси уже в базе.', error);
			} else {
				throw ApiError.BadRequest('Ошибка добавления прокси в базу.', error);
			}
		}
	}
	async getFreeProxy() {
		// return await ProxyModel.findOneAndUpdate({ free: true });
		return await ProxyModel.findOneAndUpdate({ free: true }, { free: false }, { new: true });
	}
	async getAll() {
		return await ProxyModel.find();
	}
}

module.exports = new ProxySrvice();
