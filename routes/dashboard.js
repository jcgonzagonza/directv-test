const router = require('express').Router();
const User = require('../models/User');
const { getHash } = require('../utils/hash');

router.get('/:id', async (req, res) => {
	try {
		const findUser = await User.findOne({ _id: req.params.id });
		console.log('***req.params.id: ', req.params.id);
		res.json({
			message: 'got it!',
			findUser,
		});
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		console.log('***req.params.id: ', req.params.id);
		res.json({
			message: 'Deleted!',
			deletedUser,
		});
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.put('/update/:id', async (req, res) => {
	try {
		const body = {
			name: req.body.name,
			email: req.body.email,
			password: await getHash(req.body.password),
		};

		// eslint-disable-next-line max-len
		const updateUser = await User.findByIdAndUpdate(req.params.id, body, { useFindAndModify: false });
		res.json({
			message: 'Edited!',
			updateUser,
		});
	} catch (error) {
		res.status(400).json({ error });
	}
});

module.exports = router;
