const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];

	if (typeof authHeader !== 'undefined') {
		const token = authHeader.split(' ')[1];

		if (token) {
			jwt.verify(token, 'seu_segredo_secreto', (err, decoded) => {
				if (err) {
					if (err.name === 'JsonWebTokenError') {
						return res.status(403).json({ mensagem: 'Token inválido' });
					} else if (err.name === 'TokenExpiredError') {
						return res.status(403).json({ mensagem: 'Token expirado' });
					} else {
						return res
							.status(500)
							.json({ mensagem: 'Erro ao processar o token' });
					}
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res
				.status(401)
				.json({ mensagem: 'Token de autenticação não fornecido' });
		}
	} else {
		return res
			.status(403)
			.json({ mensagem: 'Cabeçalho de autorização não encontrado' });
	}
};

module.exports = { verifyToken };
