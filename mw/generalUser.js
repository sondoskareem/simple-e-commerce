let User = require("../models/users");
var jwt = require('jsonwebtoken');
// const config_token = require("../config/token")
const config_token = process.env.TOKEN

exports.generalUser= function (req, res, next) {
	var token = req.headers.token
	if (token) {
			jwt.verify(token, config_token,function (err, decoded) { 
					if (err) {
						res.status(401).send({ msg: 'There\'s something wrong' })
					}
					// console.log(decoded)
					User.findOne({_id: decoded.id})
					.select('name email phone location')
					.then(user =>{
						req.generalUser = user
						next()
					})
					.catch(err =>{
						res.status(401).send({ msg: 'Unauthorized' })
					})
			})
		}else{
			res.status(401).send({ msg: 'Unauthorized' })
		}
	}
			


