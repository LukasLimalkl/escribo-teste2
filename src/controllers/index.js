const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
	try {
		const { email, senha } = req.body;

		const user = await Users.findOne({ email });

		if (!user) {
			return res.status(404).json({ mensagem: 'Usuário e/ou senha inválidos' });
		}

		const validPassword = await bcrypt.compare(senha, user.senha);

		if (!validPassword) {
			return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
		}

		const token = jwt.sign(
			{
				userId: user._id,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				ultimo_login: user.updatedAt,
			},
			'token',
			{ expiresIn: '30m' },
		);

		const encryptedToken = await bcrypt.hash(token, 10);

		user.token = encryptedToken;
		await user.save();

		const userInfo = {
			userId: user._id,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			ultimo_login: user.updatedAt,
			token: token,
		};

		return res.status(200).json(userInfo);
	} catch (error) {
		console.error('Erro ao realizar login:', error);
		return res.status(500).json({ mensagem: 'Erro ao realizar login' });
	}
};

const signUp = async (req, res) => {
	try {
		const { nome, email, senha, telefones } = req.body;

		const existingUser = await Users.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ mensagem: 'Email já existente' });
		}

		const hashedPassword = await bcrypt.hash(senha, 10);

		const newUser = new Users({
			nome,
			email,
			senha: hashedPassword,
			telefones,
		});

		const token = jwt.sign(
			{
				userId: newUser._id,
				createdAt: newUser.createdAt,
				updatedAt: newUser.updatedAt,
				ultimo_login: newUser.updatedAt,
			},
			'token',
			{ expiresIn: '30m' },
		);

		const encryptedToken = await bcrypt.hash(token, 10);

		newUser.token = encryptedToken;

		await newUser.save();

		const userInfo = {
			id: newUser._id,
			createdAt: newUser.createdAt,
			updatedAt: newUser.updatedAt,
			ultimo_login: newUser.updatedAt,
			token: token,
		};

		return res.status(201).json(userInfo);
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
	}
};

const getInfos = async (req, res) => {
	try {
		const token = req.headers.bearer;

		const authData = await new Promise((resolve, reject) => {
			jwt.verify(token, 'token', (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});

		const user = await Users.findOne({ _id: authData.userId });

		return res.status(200).json({ mensagem: 'Token válido', user });
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return res.status(403).json({ mensagem: 'Token expirado' });
		} else {
			return res.status(403).json({ mensagem: 'Token inválido' });
		}
	}
};

module.exports = { signIn, signUp, getInfos };
