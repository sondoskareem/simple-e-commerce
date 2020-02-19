'use strict';
const Joi = require('joi');
const mongoose = require('mongoose');
var moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users')
var UserValidation = require('../validation/UserValidation');
const config_token = require("../config/token")



function CreateUser(role , req , res){
	const validating = UserValidation.new_user(req.body);
	if (validating.error) {
	  res.status(400).send({
		msg: validating.error.details[0].message
	  })
	} else {
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(req.body.password, salt);
			const user = new Driver({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				phone: req.body.phone,
				password: hash,
				email: req.body.email,
				location: req.body.location,
				role: role,
				isActive: true,
				player_id: req.body.player_id,
				country_id: req.body.country_id,
				createdAt:  moment().format('DD/MM/YYYY'),
				updateddAt: moment().format('DD/MM/YYYY'),
			  });
			  user.save()
			  .then(result =>{
				var token = jwt.sign({
					exp: Math.floor(Date.now() / 1000) + (32832000),
					id: result._id,
				  }, config_token);
				  res.status(200).send({token: token , role:result.role})	
					  })
			  .catch(err =>{
				var msg
				if(err.name === 'MongoError' && err.code === 11000){
				if( err.errmsg.includes("$name_1 dup key")){
				   msg = "name duplicated"
				  }else if(err.errmsg.includes("$phone_1 dup key")){
					 msg = "phone duplicated"
				 }else if(err.errmsg.includes("$email_1 dup key")){
				   msg = "email duplicated"
				  }else{
					   msg = err
				  } 
				}
				 res.status(400).send({ msg: msg });
			  })
	}  


}