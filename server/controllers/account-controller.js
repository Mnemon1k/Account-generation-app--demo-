const AccountModel = require('../models/accountModel');
const AccountService = require('../service/account-service');

class AccountController {
	async add(req, res, next) {
		try {
			var account = req.body;

			// Проверяем чтобы все поля были переданы
			if ('name' in account && 'surname' in account && 'birthday' in account) {
				const accountFromDb = await AccountService.create(account);
				const verifLink = await AccountService.regAndGetVerifLink({
					...accountFromDb.toObject(),
				});

				res.status(200).json({ statusCode: 200, payload: { verifLink, accountFromDb } });
			} else {
				res.status(400).json({ statusCode: 400, message: 'Указаны не все данные.' });
			}
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			var { id } = req.body;
			await AccountModel.findOneAndDelete({ id });
			res.status(200).json({ statusCode: 200 });
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			var data = req.body;
			console.log(`Обновляем акаунт ${data.id}`);
			console.log(data);
			if (data.id) {
				await AccountModel.findOneAndUpdate({ _id: data.id }, { ...data });
				res.status(200).json({ statusCode: 200 });
			} else {
				res.status(400).json({ statusCode: 400, message: 'Не указан ID акаунта.' });
			}
		} catch (error) {
			next(error);
		}
	}

	async getAll(req, res, next) {
		try {
			const accounts = await AccountService.getAll();

			res.status(200).json({ statusCode: 200, payload: accounts });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new AccountController();
