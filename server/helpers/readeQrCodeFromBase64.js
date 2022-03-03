var QrCode = require('qrcode-reader');
var Jimp = require('jimp');
const ApiError = require('../exceptions/api-error');

// base64 need to be without "data:image/png;base64,"
module.exports = async function readeQrCodeFromBase64(base64) {
	try {
		var qrCodeBuffer = Buffer.from(base64, 'base64');
		var JimpBuffer = await Jimp.read(qrCodeBuffer);
		var qr = new QrCode();
		qr.decode(JimpBuffer.bitmap);

		return qr.result.result;
	} catch (error) {
		throw ApiError.BadRequest('Ошибка распознания QR кода.', error);
	}
};
