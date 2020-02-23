'use strict';
const Joi = require('joi');
const mongoose = require('mongoose');
var moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Driver = require('../models/driver')
var UserValidation = require('../validation/UserValidation');
// const config_token = require("../config/token")
// const config_token = process.env.TOKEN
const config_token ='_tT76___z0@k044sokiu8792^)sdZZz$$'

const uuidv1 = require('uuid/v1');
var base64Img = require('base64-img');
var check_user = require('../mw/check_user');


 function  loadImage(base64String  , req , res){
	var name = uuidv1();
	var Filepath = "./public/" ;
	var imgPath = base64Img.imgSync(base64String, Filepath, name);
  	var img = imgPath.split("\\", 2)
	return img[1];
}

exports.CreateDriver = (req , res)=>{
	const validating = UserValidation.new_driver(req.body);
	if (validating.error) {
	  res.status(400).send({
		msg: validating.error.details[0].message
	  })
	} else {
		// console.log(loadImage(req.body.id_front , req , res ))
		
			const driver = new Driver({
				_id: new mongoose.Types.ObjectId(),
				id_front: loadImage(req.body.id_front , req , res ),
				id_back: loadImage(req.body.id_back  , req , res),
				car_type: req.body.car_type,
				car_model: req.body.car_model,
				personal_img: loadImage(req.body.personal_img  , req , res),
				form_img: loadImage(req.body.form_img  , req , res),
				license_img: loadImage(req.body.license_img  , req , res),
				user_id : req.check_user._id,
				createdAt:  moment().format('DD/MM/YYYY'),
				updateddAt: moment().format('DD/MM/YYYY'),
			  });
			  driver.save()
			  .then(result =>{
				//role might be change , but not know
				  res.status(200).send({data:'Your request has been sent'})	
					  })
			  .catch(err =>{
				 res.status(400).send({ msg: 'Somthing wrong try again later ' });
			  })
	}  


}

exports.getDrivers = async(req , res) =>{
	await Driver.find({})
	.populate({ path: 'user_id',  populate: { path: 'country_id' } , select : 'name phone email location  '  })
	// .populate('user_id' , 'name phone email location  ')
	.then(result =>{
	  res.status(200).send({data:result})
	})
	.catch(err =>{
	  res.status(400).send({msg:'err'})
	})
}