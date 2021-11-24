const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
console.log(`${process.env.DBNAME}`);

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mkb99.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Database connected'))
	.catch((e) => console.log('error db:', e));

// import routes
const authRoutes = require('./routes/auth');
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');

// route middlewares
app.use('/api/user', authRoutes);
app.get('/', (req, res) => {
	res.json({
		estado: true,
		mensaje: 'Works perfectly!',
	});
});

app.use('/api/dashboard', verifyToken, dashboadRoutes);

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`server running on: ${PORT}`);
});
