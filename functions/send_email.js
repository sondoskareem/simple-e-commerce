const Email = require('../models/email');
var moment = require('moment');
const shortid = require('shortid');
var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

exports.send_email  = function (email , id , req , res , successMsg){
	var shortID = shortid.generate()
	// console.log('//////////////////////111')
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
	  console.log('2000')

	  var mailOptions = {
		from: 'shopping@gmail.com',
		to:email,
		subject: 'Account validation',
		html: `<p> confirmation code :  \n <h2> ${shortID} </h2></p>`
	  };
	  console.log('3000')

	  transporter.sendMail(mailOptions, function (error, info) {
		//   console.log('fun not working ')
		if (error) {
			console.log(error)
		  res.status(400).send({ msg: 'err' })
		} else {
			console.log('inside222')
			// Email.deleteMany({user_id:id}).then(resulttt=>{
				const email = new Email({
					_id: new mongoose.Types.ObjectId(),
					code: shortID,
					email: email,
					user_id: id,
					exp: moment().add(1, 'hours').format('llll')
				  })
				  email.save()
			.then(result1 => {
			   console.log('cooooooodeee  '+result1)
			   res.status(200).send({msg:'Registration Done'})
			})
			.catch(err => {
				res.status(400).send({msg:'err'})
			})
			// }).catch(err=>{})
		  
	  console.log('4000')

		}
	  });
}