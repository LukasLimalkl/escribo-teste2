const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		nome: String,
		email: String,
		senha: String,
		telefones: [{ numero: String, ddd: String }],
		token: String,
	},
	{ timestamps: true },
);

const Users = mongoose.model('User', userSchema);

module.exports = Users;
