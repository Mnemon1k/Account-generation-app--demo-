const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
	console.log(err);

	if (err instanceof ApiError) {
		let { message, errors } = err;
		return res.status(err.status).json({ statusCode: err.status, message, errors });
	}
	return res.status(500).json({ message: 'Unexpected error', data: err });
};
