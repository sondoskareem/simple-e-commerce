var moment = require('moment');
const User = require('../models/users')
const send_email = require('../functions/send_email')
// const config_token = require("../config/token")
// const config_token = process.env.TOKEN
const config_token ='_tT76___z0@k044sokiu8792^)sdZZz$$'
const Email = require('../models/email');


exports.check_email_code= function (req, res, next) {
     let code = req.body.code
     let email = req.body.email
   Email.find({ code: code , email:email})
     .then(result => {
       if (result.length == 0) {
         res.status(400).send({ msg: "Wrong , check your code" })
       } else {
         var ex = moment((new Date(result[0].exp))).format('llll');
         var now = moment(Date.now()).format('llll');
         var ex1 = new Date(ex)
         var now1 = new Date(now)
         if (moment(now1).isSameOrAfter(moment(ex1))) {
           Email.deleteOne({ code: code })
             .then(resultt => {
               res.status(400).send({ msg: 'Try again later' })
             })
             .catch(err => {
               res.status(400).send({ msg: 'Somthing went wrong' })
             })
         } else {User.updateOne({email:email}, {$set: {"isActive": true}}, {new: true}).then(result2 => {
                 Email.deleteOne({ email: email , code:code })
                 .then(result3 => {
                 next();
                 })
                 .catch(err => {
               	res.status(400).send({ msg: 'err' })
                 })
             })
             .catch(err => {
               res.status(400).send({ msg: 'err' })
             });
         }
       }
     })
     .catch(err => {
       res.status(400).send({ msg: 'Somthing went wrong' })
 
     })
}