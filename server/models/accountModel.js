const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	birthday: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: 'new',
	},
	country: {
		type: String,
	},
	region: {
		type: String,
	},
	telegram: {
		type: String,
	},
	google_auth: {
		type: String,
	},
	backup_codes: {
		type: String,
	},
	incogniton_profile_id: {
		type: String,
	},
	created_at: { type: Date, default: Date.now },
	email: {
		type: Schema.Types.ObjectId,
		ref: 'Email',
	},
	proxy: {
		type: Schema.Types.ObjectId,
		ref: 'Proxy',
	},
});

module.exports = model('Account', AccountSchema);
