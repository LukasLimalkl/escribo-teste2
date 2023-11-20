const cors = require('cors');
const app = require('./app');
const PORT = 3333;

app.use(cors());

app.listen(PORT, () => {
	console.log('running on http://localhost:3333/');
	console.log('Server running on port:', PORT);
});
