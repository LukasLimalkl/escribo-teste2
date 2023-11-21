const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const singIn = async (req, res) => {
	try {
		const { email, senha } = req.body;

		const user = await Users.findOne({ email });

		if (!user) {
			return res.status(404).json({ messagem: 'Usuário e/ou senha invalidos' });
		}

		const validPassword = await bcrypt.compare(senha, user.senha);

		if (!validPassword) {
			return res.status(401).json({ messagem: 'Usuário e/ou senha invalidos' });
		}

		const token = jwt.sign(
			{
				userId: user._id,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				ultimo_login: user.updatedAt,
			},
			'token',
			{ expiresIn: '1h' },
		);

		const encryptedToken = await bcrypt.hash(token, 10);

		const userInfo = {
			userId: user._id,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			ultimo_login: user.updatedAt,
			token: encryptedToken,
		};

		return res.status(200).json(userInfo);
	} catch (error) {
		console.error('Erro ao realizar login:', error);
		return res.status(500).json({ messagem: 'Erro ao realizar login' });
	}
};

const singUp = async (req, res) => {
	try {
		const { nome, email, senha, telefones } = req.body;

		const existingUser = await Users.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ messagem: 'Email ja existente' });
		}

		const hashedPassword = await bcrypt.hash(senha, 10);

		const newUser = new Users({
			nome,
			email,
			senha: hashedPassword,
			telefones,
		});

		await newUser.save();

		const token = jwt.sign(
			{
				userId: newUser._id,
				createdAt: newUser.createdAt,
				updatedAt: newUser.updatedAt,
				ultimo_login: newUser.updatedAt,
			},
			'token',
			{ expiresIn: '1h' },
		);

		const encryptedToken = await bcrypt.hash(token, 10);

		const userInfo = {
			id: newUser._id,
			createdAt: newUser.createdAt,
			updatedAt: newUser.updatedAt,
			ultimo_login: newUser.updatedAt,
			token: encryptedToken,
		};

		return res.status(201).json(userInfo);
	} catch (error) {
		return res.status(500).json({ messagem: 'Erro ao cadastrar usuário' });
	}
};

const getInfos = (req, res) => {};

module.exports = { singIn, singUp, getInfos };
