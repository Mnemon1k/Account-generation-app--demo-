const AccountModel = require('../models/accountModel');
const ApiError = require('../exceptions/api-error');
const antikSrvice = require('../service/antik-service');
const emailSrvice = require('../service/email-service');
const proxyService = require('./proxy-service');
const getRandomInt = require('../helpers/getRandomInt');
const CONFIG = require('../config');
const seleniumService = require('./selenium-service');

class AccountSrvice {
	async create(accountData) {
		var { name, surname, birthday, country } = accountData;

		// Если в базе есть человек с такой же фамилией и именем - выдать ошибку
		var validateName = await AccountModel.findOne({ name, surname });
		if (false) {
			throw ApiError.BadRequest('Акаунт с таким именем фамилией уже существует.');
		}

		var freeEmailFromDb = await emailSrvice.getFreeEmail();
		if (freeEmailFromDb === null) {
			throw ApiError.BadRequest('В базе нет свободных почт.');
		}

		var freeProxyFromDb = await proxyService.getFreeProxy();
		if (freeProxyFromDb === null) {
			throw ApiError.BadRequest('В базе нет свободных прокси.');
		}
		var freeProxyFromDbDTO = {
			proxy_url: freeProxyFromDb.ip + ':' + freeProxyFromDb.port,
			proxy_username: freeProxyFromDb.username,
			proxy_password: freeProxyFromDb.password,
			connection_type: freeProxyFromDb.connection_type,
		};

		// var incogniton_profile_id = 'qweqwe';
		var incogniton_profile_id = await seleniumService.createProfile({
			...accountData,
			email: freeEmailFromDb.name,
			proxy: freeProxyFromDbDTO,
		});

		var cfgCountryData = CONFIG.regions[country];
		var randomRegion = cfgCountryData[getRandomInt(0, cfgCountryData.length - 1)];
		console.log(randomRegion);
		console.log(cfgCountryData.length);
		console.log(getRandomInt(0, cfgCountryData.length - 1));

		return await AccountModel.create({
			name,
			surname,
			birthday,
			incogniton_profile_id,
			email: freeEmailFromDb,
			proxy: freeProxyFromDb,
			country,
			region: randomRegion['regionEng'],
		});
	}
	async getAll() {
		return await AccountModel.find().populate('email').populate('proxy');
	}

	async regAndGetVerifLink(accountDataFromDb) {
		// var verifLink = await antikSrvice.registerCoinlistAccount(accountDataFromDb);
		var verifLink = await seleniumService.registerCoinlistAccount(accountDataFromDb);
		return verifLink;
	}
}

module.exports = new AccountSrvice();
