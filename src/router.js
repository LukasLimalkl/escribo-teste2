const express = require('express');
const { singIn, singUp, verifyToken } = require('./controllers');
const router = express();

router.get('/', (req, res) => {
	res.send('hello word');
});

router.post('/login', singIn);
router.post('/singup', singUp);

router.get('/sua-rota', verifyToken, (req, res) => {
	res.json({ mensagem: 'Rota protegida acessada com sucesso' });
});

module.exports = router;
