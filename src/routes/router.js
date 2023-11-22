const express = require('express');
const { signIn, signUp, getInfos } = require('../controllers');
const { verifyToken } = require('../middleware');
const router = express();

router.get('/', (req, res) => {
	res.json({ messagem: 'Use o endpoint /api-doc para documentacao da api' });
});

router.post('/login', signIn);
router.post('/singup', signUp);

router.get('/getuser', verifyToken, getInfos);

module.exports = router;
