const { verifyToken } = require('./jwt');
const User = require('../model/user');

const auth = async (req, res, next) => {
	console.log(req.cookies);
	const token = req.cookies.jwt_auth;
	try {
		if (!token) {
			return res.status(401).end();
		}
		const signedUserId = verifyToken(token);
        console.log(signedUserId);
		next();
	} catch (err) {
		res.status(401).end();
	}
};

module.exports = { auth };