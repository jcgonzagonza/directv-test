const router = require('express').Router();
const jwt = require('jsonwebtoken');
// password
const bcrypt = require('bcrypt');

// validation
const Joi = require('@hapi/joi');
const { getHash } = require('../utils/hash');
const User = require('../models/User');

const schemaRegister = Joi.object({
	name: Joi.string().min(6).max(255).required(),
	email: Joi.string().min(6).max(255).required().email(),
	password: Joi.string().min(6).max(1024).required(),
});

// eslint-disable-next-line consistent-return
router.post('/register', async (req, res) => {
	// validate user
	const { error } = schemaRegister.validate(req.body);

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const isEmailExist = await User.findOne({ email: req.body.email });
	if (isEmailExist) {
		return res.status(400).json({ message: 'E-mail already exists' });
	}

	// hash
	const password = await getHash(req.body.password);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password,
	});
	try {
		const savedUser = await user.save();
		res.json({
			data: savedUser,
		});
		// eslint-disable-next-line no-shadow
	} catch (error) {
		res.status(400).json({ error });
	}
});

const schemaLogin = Joi.object({
	email: Joi.string().min(6).max(255).required().email(),
	password: Joi.string().min(6).max(1024).required(),
});

// eslint-disable-next-line consistent-return
router.post('/singin', async (req, res) => {
	// validaciones
	const { error } = schemaLogin.validate(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).json({ message: 'Invalid username and/or password' });

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(401).json({ message: 'Invalid username and/or password' });

	// create token
	const token = jwt.sign(
		{
			name: user.name,
			// eslint-disable-next-line no-underscore-dangle
			id: user._id,
		},
		process.env.TOKEN_SECRET,
		{ expiresIn: '1800s' },
	);

	res.header('auth-token', token).json({
		data: { token },
	});
});

module.exports = router;
