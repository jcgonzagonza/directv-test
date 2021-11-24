const jwt = require('jsonwebtoken');

// middleware to validate token (rutas protegidas)
// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.status(401).json({ message: 'Access denied' });
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (error) {
		res.status(400).json({ error: 'Invalid token' });
	}
};

module.exports = verifyToken;
