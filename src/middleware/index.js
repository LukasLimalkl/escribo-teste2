const verifyToken = async (req, res, next) => {
	const bearerHeader = req.headers['bearer'];
	if (!bearerHeader || typeof bearerHeader === 'undefined') {
		res.status(403).json({ mensagem: 'Token não fornecido' });
		return;
	}

	const bearer = bearerHeader.split(' ');
	if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
		res.status(403).json({ mensagem: 'Formato de token inválido' });
		return;
	}

	const bearerToken = bearer[1];
	req.token = bearerToken;
	next();
};

const errorRouter = (req, res) => {
	res.status(404).json({ messagem: 'Essa rota nao existe' });
};

module.exports = { verifyToken, errorRouter };
