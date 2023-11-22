const express = require('express');
const { signIn, signUp, getInfos } = require('../controllers');
const { verifyToken } = require('../middleware');
const router = express();

router.get('/', (req, res) => {
	res.json({ messagem: 'Use o endpoint /api-doc para documentacao da api' });
});

router.post('/signin', signIn);
router.post('/signup', signUp);

router.get('/getuser', verifyToken, getInfos);

module.exports = router;
