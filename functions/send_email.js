const Email = require('../models/email');
var moment = require('moment');
var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

exports.send_email  = function (email,time , id , req , res , successMsg){
	var time = moment((new Date(time))).format('llll');
	var newEx =  moment(time).add(1, 'hours').format('llll')
	var shortID = (Math.round(Math.random() * 899999 + 100000))
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'shoppingorder8@gmail.com',
		  pass: 'Baghdad111'
		},
		tls: {
		  rejectUnauthorized: false
		}
	  });
	  var mailOptions = {
		from: 'shopping@gmail.com',
		to:email,
		subject: 'Account validation',
		html: `<p> confirmation code :  \n <h2> ${shortID} </h2></p>`
	  };
	  transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error)
		  res.status(400).send({ msg: 'err' })
		} else {
				const newemail = new Email({
					_id: new mongoose.Types.ObjectId(),
					code: shortID,
					email: email,
					user_id: id,
					exp: newEx
				  })
				  newemail.save()
			.then(result1 => {
			})
			.catch(err => {
				res.status(400).send({msg:'err'})
			})
		}
	  });
}