'use strict';
const Joi = require('joi');
const mongoose = require('mongoose');
var moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users')
var UserValidation = require('../validation/UserValidation');
const config_token = require("../config/token")

exports.create_a_User = function (req, res) {
	const validating = UserValidation.new_user(req.body);
	if (validating.error) {
	  res.status(400).send({
		msg: validating.error.details[0].message
	  })
	} else {
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(req.body.password, salt);
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				phone: req.body.phone,
				password: hash,
				email: req.body.email,
				location: req.body.location,
				role: req.body.role,
				isActive: 1,
				player_id: req.body.player_id,
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

exports.loginUser = function (req, res) {
	if (req.body.phone && req.body.password) {
		  User.find({ phone: req.body.phone })
			.then(result => {
				var usercheck = bcrypt.compareSync(req.body.password, result[0].password);
          if (usercheck) {
             if(result[0].isActive){ 
				 var token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (32832000),
                id: result[0]._id,
              },config_token);
            //  console.log(result[0])
			  res.status(200).send({token: token , role:result[0].role})
			}
			else{res.status(401).send({msg:'You must first confirm your phone number'})}

		}else{
			res.status(400).send({msg:'incorrect userName or password'})
		}
	})
	.catch(err =>{
		res.status(400).send({msg:'incorrect userName or password'})
	})
	}else{
		res.status(400).send({msg:'email and password required'})
	}
}

exports.forgetPassword = async(req , res) => {
	if(!req.body.phone || !req.body.password){
		res.send.status(400).send({msg :'Please inter the required field'})

	}else{
		const data = { 
			password: req.body.password ,
			updateddAt: moment().format('DD/MM/YYYY')
			};
			const filter = {phone:req.body.phone}

		await User.findOneAndUpdate(filter, data, {
			new: true
		  } ,  (err, doc) => {
			if (err) {
				res.status(400).send({msg :'There\'s something wrong , please try again'})
			}
		
			res.status(200).send({data : 'Done'})
		});
	}
}

exports.users = async(req , res) => {
	if(req.query.role){
		await User.find({role:req.query.role})
		.select(' name phone email location')
	   .then(data =>{
		   res.status(200).send({ data: data })
		   })
	   .catch(err => { 
		   res.status(400).send({ data: err })
		}) 
	}else{
		await User.find({})
		.select(' name phone email location')
	   .then(data =>{
		   res.status(200).send({ data: data })
		   })
	   .catch(err => { 
		   res.status(400).send({ data: err })
		}) 
	}
	
}
