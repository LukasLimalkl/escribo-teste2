const Users = require('../models/Users');

const singIn = async (req, res) => {
	try {
		const { email, senha } = req.body;
		// Verifica se o usuário com o email fornecido existe no banco de dados
		const user = await Users.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}

		// Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
		if (user.senha !== senha) {
			return res.status(401).json({ message: 'Credenciais inválidas' });
		}

		return res.status(200).json({ message: 'Login bem-sucedido', user });
	} catch (error) {
		console.error('Erro ao realizar login:', error);
		return res.status(500).json({ message: 'Erro ao realizar login' });
	}
};

const singUp = async (req, res) => {
	try {
		const { nome, email, senha, telefones } = req.body;
		// Verifica se o usuário com o email fornecido já existe no banco de dados
		const existingUser = await Users.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ message: 'Este email já está em uso' });
		}

		const newUser = new Users({
			nome,
			email,
			senha,
			telefones,
		});

		// Salva o novo usuário no banco de dados
		await newUser.save();
		return res
			.status(201)
			.json({ message: 'Usuário cadastrado com sucesso', newUser });
	} catch (error) {
		console.error('Erro ao cadastrar usuário:', error);
		return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
	}
};

module.exports = { singIn, singUp };
