const axios = require('axios');
const ApiError = require('../exceptions/api-error');
const CONFIG = require('../config');

class AnticapthaService {
	async sendSolveHcapchaRequest(sitekey) {
		try {
			let { data } = await axios.post('https://2captcha.com/in.php', {
				key: CONFIG.anti_captha_api,
				method: 'hcaptcha',
				sitekey,
				pageurl: 'https://coinlist.co/register',
				json: 1,
			});
			console.log(data);

			if (data.status === 1) {
				return await this.checkSolvingCapthaStatus(data.request);
			} else {
				// ошибка решения капчи - акаунт не будет создан
			}
		} catch (error) {
			throw ApiError.BadRequest('Ошибка решения капчи.', error);
		}
	}

	async checkSolvingCapthaStatus(id, delay = false) {
		if (delay) {
			await this.delayFn();
		}

		let { data } = await axios({
			method: 'get',
			url: 'https://2captcha.com/res.php',
			params: {
				json: 1,
				key: CONFIG.anti_captha_api,
				action: 'get',
				id,
			},
		});

		if (data.status === 1) {
			console.log('Капча решена');
			return data.request;
		} else {
			console.log(data);
			return await this.checkSolvingCapthaStatus(id, true);
		}
	}
	async delayFn() {
		return new Promise((resolve) => setTimeout(resolve, 3000));
	}
}

module.exports = new AnticapthaService();
