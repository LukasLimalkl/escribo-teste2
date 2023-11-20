const mongoose = require('mongoose');

const Users = mongoose.model('Users', {
	nome: String,
	email: String,
	senha: String,
	telefones: [{ numero: String, ddd: String }],
});

module.exports = Users;
