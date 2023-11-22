require('dotenv').config();

const cors = require('cors');
const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT;

app.use(cors());

mongoose.set('strictQuery', false);

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log('Db Connected');
			console.log('running on http://localhost:3333/api-doc');
			console.log('Server running on port:', PORT);
		});
	})
	.catch((e) => console.log(e));
