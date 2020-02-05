let User = require("../models/users");
var jwt = require('jsonwebtoken');
const config_token = require("../config/token")


exports.checkLogin_admin= function (req, res, next) {
	var token = req.headers.token
	if (token) {
		try {
			jwt.verify(token, config_token,
				function (err, decoded) { 
					if (err) {
						res.status(401).send({ msg: 'There\'s something wrong' })
					}
					User.findOne({
						_id: decoded.id
					}, (err, user) => {
						if (err) {
							res.status(401).send({ msg: err })
						}
						if (user && user.role == 2) {
								req.checkLogin_admin = user
								next()
						} else {
							// console.log('err')
							res.status(401).send({ msg: 'Unauthorized' })
						}
					})
				});
		}

		catch (error) {
			res.send(error)
		}
	} else {
		res.status(401).send({ msg: 'Unauthorized' })
	}
}



