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
      // if(req.files.file){
      // console.log(req.files.file)
      console.log(req.body)

      //   var file = req.files.file;
      //   var changetype = file.mimetype.split("/", 1);
      //   if (changetype == 'image') {
      //     let name = file.name;
      //     var FileUud = uuidv1();
      //     const ExtArr = file.mimetype.split("/", 2)
      //     var Filepath = "./public/" + FileUud + '.' + ExtArr[1];
      //     var urlFile = FileUud + '.' + ExtArr[1];
      //     file.mv(Filepath);
          const order = new Order({
            description:req.body.description,
            phone:req.body.phone,
            location:req.body.location,
            user_id : req.check_user._id,
            section_id : req.body.section_id,
            country_id : req.body.country_id,
            accepted_by_user : false,
            accepted_by_center : false,
            price : ' ',
            arrivalAt:' ',
            image : 'req.files.file',
            paid : false,
            paidAt : ' ',
            isActive: true,
            user_player_id:req.check_user.player_id,
            center_player_id: ' ',
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
            res.status(400).send({msg:'Wait'})
          })
      //   }else{
      //   res.status(400).send({msg:'image is required'})
      // }
      }
      // else{
      //   res.status(400).send({msg:'image is required'})
      // }

    // }
}

async function updatedOrder( player_id ,filter , data , order_id , req , res) {
  await Order.findOneAndUpdate(filter, data, {new: true} ,  (err, doc) => {
    if (err) {
      res.status(400).send({msg :'There\'s something wrong , please try again'})
    }
      let playerId 
        if(player_id == 'center_player_id'){
          playerId = doc.center_player_id
        }else{
          playerId = doc.user_player_id
        }
              // var message = { 
              //   "app_id": "b2903fd-3291fc3be",
              //   "contents": { "en": " Your request has bee" },
              //   "data": { "data1": order_id},
              //   "include_player_ids": [playerId],
              // }
              // sendNotification(message);
    res.status(200).send({data :'request has been sent'})
  });
}

// async function getOrder(user_id , filter){
//   Order.find()
// }
exports.accepted_by_center = (req , res) =>{
  const data = { 
    accepted_by_center: req.body.accepted_by_center ,
    price: req.body.price ,
    arrivalAt: req.body.arrivalAt ,
    center_player_id:req.check_center.player_id
    };
    const order_id = req.body.order_id
    const filter = {_id:order_id}
    console.log()
   updatedOrder('center_player_id' ,filter , data ,order_id , req , res)
}

exports.accepted_by_user = async (req, res) =>{
  const data = { 
    accepted_by_user: req.body.accepted_by_user ,
    paid:req.body.paid,
    paidAt:req.body.paidAt
    };
    const order_id = req.body.order_id
    const filter = {_id:order_id}
    // console.log()
   updatedOrder('user_player_id' ,filter , data ,order_id , req , res)
}

exports.orderForCenter = (req , res)=>{
  const obj = {
    country_id : req.check_center.country_id ,
    accepted_by_user:req.query.acceptedByUser ,
    accepted_by_center:req.query.acceptedByCenter
  }
  query(obj , req , res)
  
}


exports.orderForAdmin = (req , res)=>{
  const obj = {
    accepted_by_user:req.query.acceptedByUser ,
    accepted_by_center:req.query.acceptedByCenter
  }
  query(obj , req , res)
}


exports.OrderForUser = (req , res)=>{
  const obj = {
    user_id : req.check_user._id,
    accepted_by_user:req.query.acceptedByUser ,
    accepted_by_center:req.query.acceptedByCenter
  }
  query(obj , req , res)
}


async function query(params, req , res){
  await Order.find(params)
  .populate('country_id' , 'name flag')
  .select('order1 phone accepted_by_user location accepted_by_center price  arrivalAt  image paid paidAt createdAt updateddAt')
  .then(result =>{
    res.status(200).send({data:result})
  })
  .catch(err =>{
    res.status(400).send({msg:'err'})
  })
}