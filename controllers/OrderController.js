'use strict';
const Joi = require('joi');
const mongoose = require('mongoose');
var moment = require('moment');
var OrderValidation = require('../validation/OrderValidation');
const joi = require('joi');
const Order = require('../models/orders')
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
var nodemailer = require('nodemailer');
const uuidv1 = require('uuid/v1');
const sendNotification = require('../oneSignal/sendNotification')

exports.add_order =  (req, res) =>{
	const validating = OrderValidation.order(req.body);
	if (validating.error) {
	  res.status(400).send({
		msg: validating.error.details[0].message
      })
    }else{
        var file = req.files.file;
        var changetype = file.mimetype.split("/", 1);
        if (changetype == 'image') {
          let name = file.name;
          var FileUud = uuidv1();
          const ExtArr = file.mimetype.split("/", 2)
          var Filepath = "./public/" + FileUud + '.' + ExtArr[1];
          var urlFile = FileUud + '.' + ExtArr[1];
          file.mv(Filepath);
          const order = new Order({
            description:req.body.description,
            phone:req.body.phone,
            location:req.body.location,
            user_id : req.check_user._id,
            section_id : req.body.section_id,
            accepted_by_user : false,
            accepted_by_center : false,
            price : ' ',
            image : urlFile,
            paid : false,
            paidAt : ' ',
            createdAt: req.body.createdAt,
            updateddAt: req.body.createdAt,
          })
          order.save()
          .then(result =>{
            res.status(200).send({msg:'You\'r request has been sent successfuly' })
            // console.log(result._id)
              // var message = { 
              //   "app_id": "b2903fd-3291fc3be",
              //   "contents": { "en": " Your request has bee" },
              //   "data": { "data1": result[0]._id},
              //   "include_player_ids": [req.check_user.player_id],
              // }
              // sendNotification(message);
          })
          .catch(err =>{
            res.status(400).send({msg:'err'})
          })
        }
    }
}