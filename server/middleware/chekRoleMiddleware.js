const jwt = require('jsonwebtoken')

module.exports = function (role) {
	return function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next()
		}
		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Не авторизований' })
			}
			const decoded = jwt.verify(token, process.env.SECRET_KEY)
			if (decoded.role !== role) {
				res.status(403).json({ message: 'Немає доступу' })
			}
			req.user = decoded
			next()
		} catch (e) {
			res.status(401).json({ message: 'Не авторизований' })
		}
	}
}
