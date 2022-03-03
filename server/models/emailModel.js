const { Schema, model } = require('mongoose');

const EmailSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	free: {
		type: Boolean,
		default: true,
	},
});

module.exports = model('Email', EmailSchema);
