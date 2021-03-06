let User = require("../models/users");
var jwt = require('jsonwebtoken');
const config_token = process.env.TOKEN


exports.check_user= function (req, res, next) {
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
						, isActive:true
					}
					, (err, user) => {
						if (user && user.role == 0) {
								req.check_user = user
								next()
						} else {
							res.status(401).send({ msg: 'Unauthorized' })
						}
					})
				});
		}

		catch (error) {
			res.status(400).send(error)
		}
	} else {
		res.status(401).send({ msg: 'Unauthorized' })
	}
}



