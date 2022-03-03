const proxyModel = require('../models/proxyModel');
const proxyService = require('../service/proxy-service');

class proxyController {
	async add(req, res, next) {
		try {
			if (Array.isArray(req.body)) {
				const proxys = await proxyService.create(req.body);

				res.status(200).json({ statusCode: 200, payload: proxys });
			} else {
				res
					.status(400)
					.json({ statusCode: 400, message: 'Переданы не верные данные, необходим массив прокси.' });
			}
		} catch (error) {
			next(error);
		}
	}
	async delete(req, res, next) {
		try {
			var { ip } = req.body;
			await proxyModel.findOneAndDelete({ ip });
			res.status(200).json({ statusCode: 200 });
		} catch (error) {
			next(error);
		}
	}
	async update(req, res, next) {
		try {
			var { ip, free } = req.body;
			await proxyModel.findOneAndUpdate({ ip }, { free });
			res.status(200).json({ statusCode: 200 });
		} catch (error) {
			next(error);
		}
	}
	async getAll(req, res, next) {
		try {
			const proxys = await proxyService.getAll();

			res.status(200).json({ statusCode: 200, payload: proxys });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new proxyController();
