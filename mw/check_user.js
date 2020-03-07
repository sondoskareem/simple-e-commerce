let User = require("../models/users");
var jwt = require('jsonwebtoken');
// const config_token = require("../config/token")
// const config_token = process.env.TOKEN
const config_token ='_tT76___z0@k044sokiu8792^)sdZZz$$'


exports.check_user= function (req, res, next) {
	var token = req.headers.token
	if (token) {
		try {
			jwt.verify(token, config_token,
				function (err, decoded) { 
					if (err) {
						// res.status(401).send({ msg: 'There\'s something wrong' })
						res.status(401).send({ msg: err })
					}
					User.findOne({
						_id: decoded.id
						, isActive:true
					}
					, (err, user) => {
						if (err) {
							res.status(401).send({ msg: err })
						}
						if (user && user.role == 0) {
								req.check_user = user
								next()
						} else {
							// console.log('err')
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



