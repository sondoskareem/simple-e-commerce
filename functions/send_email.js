const Email = require('../models/email');
var moment = require('moment');
const shortid = require('shortid');
// var nodemailer = require('nodemailer');
// const mongoose = require('mongoose');


exports.send_email  = function (email , id , req , res , successMsg){
var shortID = shortid.generate()

const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox81e59889aa6a4147abde685f8cbf852e.mailgun.org';
const mg = mailgun({apiKey: '35f050e9d9a34e67e6050e37347d95b7-9a235412-13b5a249', domain: DOMAIN});
const data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};

mg.messages().send(data, function (error, body) {
	console.log('body ...  '+body);
	Email.deleteMany({user_id:id}).then(resulttt=>{
		const email = new Email({
			_id: new mongoose.Types.ObjectId(),
			code: shortID,
			email: email,
			user_id: id,
			exp: moment().add(1, 'hours').format('llll')
		  })
		  email.save()
	.then(result1 => {
	   console.log(result1)
	   res.status(200).send({msg:successMsg})
	})
	.catch(err => {
		res.status(400).send({msg:'err'})
	})
	}).catch(err=>{})
  
console.log('4000')
});

	// // console.log('//////////////////////111')
	// var transporter = nodemailer.createTransport({
	// 	service: 'gmail',
	// 	auth: {
	// 	  user: 'postmaster@sandbox81e59889aa6a4147abde685f8cbf852e.mailgun.org',
	// 	  pass: 'd7bebe37c7ff820c8a6d8120bd9dca97-9a235412-e69fefe5'
	// 	},
	// 	tls: {
	// 	  rejectUnauthorized: false
	// 	}
	//   });
	//   console.log('2000')

	//   var mailOptions = {
	// 	from: 'sundus@gmail.com',
	// 	to:email,
	// 	subject: 'Account validation',
	// 	html: `<p> confirmation code :  \n <h2> ${shortID} </h2></p>`
	//   };
	//   console.log('3000')

	//   transporter.sendMail(mailOptions, function (error, info) {
	// 	//   console.log('fun not working ')
	// 	if (error) {
	// 		console.log(error)
	// 	  res.status(400).send({ msg: 'err' })
	// 	} else {
	// 		console.log('inside222')
			

		  
	// 	}
	//   });
}