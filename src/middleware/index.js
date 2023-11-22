const verifyToken = async (req, res, next) => {
	const bearerHeader = req.headers['bearer'];
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403).json({ mensagem: 'Token Invalido' });
	}
};

const errorRouter = (req, res) => {
	res.status(404).json({ messagem: 'Essa rota nao existe' });
};

module.exports = { verifyToken, errorRouter };
