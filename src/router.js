const express = require('express');
const { singIn, singUp } = require('./controllers');
const router = express();

router.get('/', (req, res) => {
	res.send('hello word');
});

router.post('/login', singIn);
router.post('/singUp', singUp);

module.exports = router;
