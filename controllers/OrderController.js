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
var base64Img = require('base64-img');
const querystring = require('query-string');

exports.add_order =  (req, res) =>{
	const validating = OrderValidation.order(req.body);
	if (validating.error) {
	  res.status(400).send({
		msg: validating.error.details[0].message
      })
    }else{
      if(req.body.file){
        // console.log(req.body.file)
          var name = uuidv1();
          var Filepath = "./public/" ;
          var imgPath = base64Img.imgSync(req.body.file, Filepath, name);
          //local \\ , on server must split on /
        var img = imgPath.split("/", 2)
     
      console.log(img)
      // console.log(img[1])
      //MW check if there is callcenter with the requested country_id to return all users with 
          const order = new Order({
            description:req.body.description,
            phone:req.body.phone,
            location:req.body.location,
            user_id : req.check_user._id,
            section_id : req.body.section_id,
            country_id : req.body.country_id,
            rejected_by_center:false,
            accepted_by_user : false,
            accepted_by_center : false,
            center_approvedAt:' ',
            price : ' ',
            arrivalAt:' ',
            image :img[1],
            paid : false,
            paidAt : ' ',
            isActive: true,
            user_player_id:req.check_user.player_id,
            center_player_id: ' ',
            createdAt: req.body.createdAt,
            updateddAt: req.body.createdAt,
          })
          // console.log(order)
          order.save()
          .then(result =>{
            res.status(200).send({msg:'You\'r request has been sent successfuly' })
            // console.log(result._id)
            //   var message = { 
            //     "app_id": "b2903fd-3291fc3be",
            //     "contents": { "en": " Your request has bee" },
            //     "data": { "data1": result[0]._id},
            //     "include_player_ids": [req.check_user.player_id],
            //   }
            //   sendNotification(message);
          })
          .catch(err =>{
            res.status(400).send({msg:'Somethis wrong'})
          })
      }
      else{
        res.status(400).send({msg:'image is required'})
      }

    }
}

async function updatedOrder( player_id ,filter , data , order_id , req , res) {
  await Order.findOneAndUpdate(filter, data, {new: true} ,  (err, doc) => {
    if (err) {
      res.status(400).send({msg :'There\'s something wrong , please try again'})
      console.log(err)
    }if(doc){
      let playerId 
      console.log('doc  ' +doc )
        if(player_id == 'center_player_id'){
          playerId = doc.center_player_id
        }else if('user_player_id'){ 
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
    }else{
      res.status(400).send({msg:'There\'s something wrong , please try again'})
    }
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
    center_approvedAt: req.body.center_approvedAt ,
    center_player_id:req.check_center.player_id
    };
    const order_id = req.body.order_id
    const filter = {_id:order_id}
    console.log('acceptedByCenter  ' + req.body )
    // console.log( 'req.check_center.player_id   ' + req.check_center.player_id)
   updatedOrder('user_player_id' ,filter , data ,order_id , req , res)
}

exports.accepted_by_user = async (req, res) =>{
  const data = { 
    accepted_by_user: req.body.accepted_by_user ,
    paid:req.body.paid,
    paidAt:req.body.paidAt
    };
    const order_id = req.body.order_id
    const filter = {_id:order_id}
    console.log('TEST ........  ' + req.body)
    res.status(200).send({data:'Test'})
    // updatedOrder('center_player_id' ,filter , data ,order_id , req , res)
}

exports.rejected_by_center = async(req , res)=>{
  const data = { 
    rejected_by_center: true,
    accepted_by_center:false,
    price:' ',
    arrivalAt: ' ',

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
      accepted_by_center:req.query.acceptedByCenter,
      rejected_by_center:false
  }
    if(req.query.id){
      obj._id = req.query.id

  } if(req.query.section_id){
      obj.section_id = req.query.section_id
  }
  query(obj , req , res)
  
}


exports.orderForAdmin = (req , res)=>{
  const obj ={}
// = {
//     accepted_by_user:req.query.acceptedByUser ,
//     accepted_by_center:req.query.acceptedByCenter
// }
  if(req.query.id){
    obj._id = req.query.id

} if(req.query.section_id){
    obj.section_id = req.query.section_id
}
if(req.query.country_id){
  obj.country_id = req.query.country_id
}
if(req.query.acceptedByUser){
  obj.accepted_by_user = req.query.acceptedByUser
}
if(req.query.acceptedByCenter){
  obj.accepted_by_center = req.query.acceptedByCenter
}
if(req.query.rejectedByCenter){
  obj.rejected_by_center = req.query.rejectedByCenter
}
query(obj , req , res)
}
  

exports.OrderForUser = (req , res)=>{
  const obj = {
    user_id : req.check_user._id,
    accepted_by_user:req.query.acceptedByUser ,
    accepted_by_center:req.query.acceptedByCenter,
    rejected_by_center:false
  }
  if(req.query.id){
     obj._id = req.query.id
  }
  else if(req.query.rejected_by_center){
    obj._id = req.query.rejected_by_center
  }
  
  query(obj , req , res)
}



exports.OrderTimeZoneForAdmin = (req , res)=>{
  Order.find({createdAt: { $gt: req.query.greater, $lt: req.query.smaller }})
  // limit(10).
  // sort({ occupation: -1 }).
  .populate('country_id' , 'name flag')
  .populate('section_id' , 'image description')
  .select('description center_approvedAt section_id phone accepted_by_user location accepted_by_center price  arrivalAt  image paid paidAt createdAt updateddAt')
  .then(result =>{
    res.status(200).send({data:result})
  })
  .catch(err =>{
    res.status(400).send({msg:'err'})
  })
}     


exports.Subtraction_OrderTimeZoneForAdmin = (req , res)=>{
    
 var a =  moment((new Date(req.query.greater)));
  var b = moment((new Date(req.query.smaller)));


// var a = moment('2016-06-06T21:03:55');//now ***********
// var b = moment('2016-05-06T20:03:55');************
// console.log(a.diff(b, 'minutes')) // 44700********
// console.log(a.diff(b, 'hours')) // 745**********
// console.log(a.diff(b, 'days')) // 31
// console.log(a.diff(b, 'weeks'))
let obj = {
  minutes : a.diff(b, 'minutes'),
  hours : a.diff(b, 'hours'),
  days : a.diff(b, 'days'),
  weeks : a.diff(b, 'weeks'),
}
res.status(200).send({obj})
}
//param validation
async function query(params, req , res){
  // console.log(params) 
  await Order.find(params)
  .populate('country_id' , 'name flag')
  .populate('section_id' , 'image description')
  .select('description center_approvedAt section_id phone accepted_by_user location accepted_by_center price  arrivalAt  image paid paidAt createdAt updateddAt')
  .then(result =>{
    res.status(200).send({data:result})
  })
  .catch(err =>{
    res.status(400).send({msg:'err'})
  })
}

