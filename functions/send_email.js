const Email = require('../models/email');
var moment = require('moment');
const shortid = require('shortid');
var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

exports.send_email  = function (email , id , req , res){
	var shortID = shortid.generate()
	// console.log('//////////////////////111')
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'sondosabd94@gmail.com',
		  pass: 'AAgHk2^#;'
		},
		tls: {
		  rejectUnauthorized: false
		}
	  });
	  console.log('2000')

	  var mailOptions = {
		from: 'sondosabd94@gmail.com',
		to:email,
		subject: 'conform password',
		html: `<p> confirmation email code :  \n <h2> ${shortID} </h2></p>`
	  };
	  console.log('3000')


	  transporter.sendMail(mailOptions, function (error, info) {
		//   console.log('fun not working ')
		if (error) {
			console.log(error)
		  res.status(400).send({ msg: 'err' })
		} else {
			console.log('inside222')
		  const email = new Email({
			_id: new mongoose.Types.ObjectId(),
			code: shortID,
			user_id: id,
			exp: moment().add(1, 'hours').format('llll')
		  })
	  console.log('4000')

		  email.save()
			.then(result1 => {
			   console.log(result1)
			})
			.catch(err => {
				res.status(400).send({msg:'err'})
			})
		}
	  });
}