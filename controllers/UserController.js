'use strict';
const Joi = require('joi');
const mongoose = require('mongoose');
var moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users')
const send_email = require('../functions/send_email')
const NotEmpty = require('../functions/NotEmpty')
const Country = require('../models/country')
var UserValidation = require('../validation/UserValidation');
// const config_token = require("../config/token")
// const config_token = process.env.TOKEN
const config_token ='_tT76___z0@k044sokiu8792^)sdZZz$$'
const Email = require('../models/email');

function CreateUser(role ,active, req , res){
	let successMsg = 'Registeration done , please confirm your email '
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
				role: role,
				isActive: active,
				player_id: req.body.player_id,
				country_id: req.body.country_id,
				count: req.body.count,
				createdAt:  req.body.time,
				updateddAt: req.body.time,
			  });
			//   console.log(role)
			  if(role === 1){
				successMsg = 'Registeration done'
				  const data ={
					count: parseInt(req.body.count) + 1 
				  }
				//   console.log(data)
				  Country.findOneAndUpdate(req.body.country_id, data, {
					new: true
				  } ,  (err, doc) => {
					if (err) {
						res.status(400).send({msg :'There\'s something wrong , please try again'})
					}if(doc){
						console.log(doc)
					}
				})
			}
			  user.save()
				.then(result =>{
						if(active === false) send_email.send_email(result.email, req.body.time,result._id , req , res)
						res.status(200).send({msg : successMsg})})
				.catch(err =>{
					var msg
					if(err.name === 'MongoError' && err.code === 11000){
					if(err.errmsg.includes("$phone_1 dup key")){
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
exports.CreateAdmin = ( req , res) => {
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(req.body.password, salt);
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				phone: req.body.phone,
				password: hash,
				email:req.body.email,
				location:  ' ',
				role: 2,
				isActive: true,
				player_id:  ' ',
				country_id:'5e3dbd380ac7b643f4633c4b',
				createdAt:  moment().format('DD/MM/YYYY'),
				updateddAt: moment().format('DD/MM/YYYY'),
			  });
			  user.save()
			  .then(result =>{
				//   console.log(result)
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


exports.create_a_User = function (req, res) {
	CreateUser(0 ,false, req, res);
}

exports.create_a_CenterCallUser = (req , res)=>{
	CreateUser(1 ,true, req, res)
}

exports.loginUser =  (req, res)=> {
	console.log('1  '+ NotEmpty.NotEmpty(req.body.player_id))
	if (req.body.email && req.body.password && NotEmpty.NotEmpty(req.body.player_id) ) {
		  User.find({ email: req.body.email})
			.then(result => {
				var usercheck = bcrypt.compareSync(req.body.password, result[0].password);
          if (usercheck) {
             if(result[0].isActive){ 
				const filter = { email: req.body.email };
				const data = { player_id: (req.body.player_id).trim() };
				console.log('data' + data)
				User.findOneAndUpdate(filter, data, {new: true} ,  (err, doc) => {
					if (err) {
						res.status(400).send({msg :'There\'s something wrong , please try again'})
					}})
				 var token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (32832000),
                id: result[0]._id,
              },config_token);
			  var obj = {
				token:token,
				role:result[0].role,
				user:{
				name:result[0].name,
				email:result[0].email,
				phone:result[0].phone
			}
			  }
			  res.status(200).send(obj)
			}
			else{res.status(401).send({msg:'You must first confirm your email'})}

		}else{
			res.status(400).send({msg:'incorrect email or password'})
		}
	})
	.catch(err =>{
		res.status(400).send({msg:'incorrect email or password'})
	})
	}else{
		res.status(400).send({msg:'All inputs required'})
	}
}
exports.users = async(req , res) => {
	if(req.query.role == 1 || req.query.role == 0 ){
		await User.find({role:req.query.role , isActive:true})
		.select(' name country_id phone email location')
		.populate('country_id')
	   .then(data =>{
		   res.status(200).send({ data: data })
		   })
	   .catch(err => { 
		res.status(400).send({data:'There\'s something wrong , please try again'})
	}) 
	}

	res.status(400).send({data:'There\'s something wrong , please try again'})
	
}

exports.UserInactive = async(req , res)=>{
if(req.body.id){
	const filter = { _id: req.body.id };
	const data = { isActive: false };
	User.findOneAndUpdate(filter, data, {new: true} ,  (err, doc) => {
		if (err) {
			res.status(400).send({msg :'There\'s something wrong , please try again'})
		}
		if(doc){
			res.status(200).send({msg:' User has been suspended	'})
		}
	})
}
}
exports.user_by_token = async(req , res)=>{
	 res.status(200).send({data:req.generalUser})
 }
exports.resend_code = function (req, res) {
	User.find({email:req.body.email })
	  .then(result => {
		if (result.length == 0) {
		  res.status(400).send({ msg: 'No users found with this email' })
		} else {
			send_email.send_email(result[0].email,req.body.time, result[0]._id , req , res)
			res.status(200).send({msg:'code has been sent'})
		}
	  })
	  .catch(err => {
		res.status(400).send({ msg: err })
	  })
  
}
exports.confirm_email = function(req , res){
	let msg = 'Email confirmed'
	// check_email_code(req , res , req.body.code,req.body.email );
	res.status(200).send({ msg: msg})

}

exports.UserForgetPassword = function (req, res) {
		if (req.body.email && req.body.code && req.body.password ) {
			let msg = 'Password updated'
			var salt = bcrypt.genSaltSync(10);
			var hash = bcrypt.hashSync(req.body.password, salt);
			User.updateOne({email: req.body.email}, {$set: {"password": hash,}}, {new: true})
			.then(result2 => {
				res.status(200).send({msg:msg})
			})
			.catch(err => {
			  res.status(400).send({ msg: 'err' })
			});
		}
		else {
		  res.status(400).send({ res: 'You must enter the required field' })
		}
	
}

exports.centerForgetPassword = function(req , res){
	if (req.body.email && req.body.password ) {
		let msg = 'Password updated'
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(req.body.password, salt);
		console.log('1')
		User.findOneAndUpdate({email:req.body.email , role:1}, {password : hash}, {new: true} ,  (err, doc) => {
			if (err) {
			  res.status(400).send({msg :'There\'s something wrong , please try again'})
			  console.log(err)
			}if(doc){
				console.log(doc)
				res.status(200).send({msg:msg})
			}
		})
	}
	else {
	  res.status(400).send({ res: 'You must enter the required field' })
	}
}

