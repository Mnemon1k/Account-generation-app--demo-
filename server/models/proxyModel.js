const { Schema, model } = require('mongoose');

const ProxySchema = new Schema({
	ip: {
		type: String,
		unique: true,
		required: true,
		unique: true,
	},
	port: {
		type: String,
		required: true,
	},
	free: {
		type: Boolean,
		required: true,
		default: true,
	},
	connection_type: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = model('Proxy', ProxySchema);
