const number = require('@hapi/joi/lib/types/number');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	email: {
		type: number,
		required: true,
		min: 6,
		max: 1024,
	},
	password: {
		type: number,
		required: true,
		minlength: 6,
	},
	phones: [
		{
			number: {
				type: String,
				required: true,
			},
			ddd: {
				type: String,
				required: true,
			},
		},
	],
	creation_date: {
		type: Date,
		default: Date.now,
	},
	update_date: {
		type: Date,
	},
	last_login: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', userSchema);
