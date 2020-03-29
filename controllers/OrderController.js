'use strict';
const Joi = require('joi');
const mongoose = require('mongoose');
var moment = require('moment');
var OrderValidation = require('../validation/OrderValidation');
const joi = require('joi');
const Order = require('../models/orders')
const Section = require('../models/sections')
const jwt = require('jsonwebtoken');
// const shortid = require('shortid');
var nodemailer = require('nodemailer');
const uuidv1 = require('uuid/v1');
const sendNotification = require('../oneSignal/sendNotification')
var base64Img = require('base64-img');
const querystring = require('query-string');

exports.add_order =  (req, res) =>{
	const validating = OrderValidation.order(req.body);
	if (validating.error) {
	console.log('ios err ' + req.body)

	  res.status(400).send({
		msg: validating.error.details[0].message
      })
    }else{
      if(req.body.file){
	console.log('ios succ  ' + req.body)

        // console.log(req.body.file)
          var name = uuidv1();
          var Filepath = "./public/" ;
          var imgPath = base64Img.imgSync(req.body.file, Filepath, name);
          //local \\ , on server must split on /
        var img = imgPath.split("/", 2)
     
      console.log(img)
      // console.log(img[1])
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
            const data ={
              count: parseInt(req.body.count) + 1 
              }
              console.log(data)
            Section.findOneAndUpdate(req.body.section_id, data, {
              new: true
              } ,  (err, doc) => {
              if (err) {
                res.status(400).send({msg :'There\'s something wrong , please try again'})
              }if(doc){
                console.log(doc)
              }
          })
              // console.log('u   '+req.check_country)
              // console.log(req.check_section._id)

            res.status(200).send({msg:'You\'r request has been sent successfuly' })
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
  let playerId = ' '
  await Order.findOneAndUpdate(filter, data, {new: true} ,  (err, doc) => {
    if (err) {
      res.status(400).send({msg :'There\'s something wrong ,   try again'})
      console.log('err ' + err)
    }if(doc){
      // console.log('OrderDoc  ' +doc )
        if(player_id == 'center_player_id'){
          playerId = doc.center_player_id
        }else if('user_player_id'){ 
          playerId = doc.user_player_id
        }
        // console.log('order_id ' + order_id)
        // console.log('playerId  ' + playerId)
              var message = { 
                "app_id": "f0825492-58b0-478a-881c-51ee436d756b",
                "contents": { "en": "View your order" },
                "data": { "data1": order_id},
                "include_player_ids": [playerId],
                // "include_player_ids": ['444'],
              }
              sendNotification(message);

    res.status(200).send({data :'request has been sent'})
    }else{
      // res.status(400).send({msg:'There\'s something wrong , 7please try again'})
    }
  });
}

//accepted and rejected actions
exports.orderActionAccordingToUserType = (req , res)=>{
  let data = {} , Person_player_id = ' '

  // console.log(req.url)
  //see if the request from center
  if (req.check_center){

    if(req.url == 'api/v1/order/rejectedByCenter'){
      [data.price , data.arrivalAt , data.rejected_by_center , data.accepted_by_center] = [' ' , ' ' , true , false]
    }
   
    //for both accepted and rejected
    data.center_player_id = req.check_center.player_id
    Person_player_id = 'user_player_id'
    const newData ={
      count: parseInt(req.body.count) - 1 
      }
      // console.log(( 'w  '+ newData))
      Section.findOneAndUpdate(req.body.section_id, newData, {
      new: true
      } ,  (err, doc) => {
      if (err) {
        res.status(400).send({msg :'There\'s something wrong ,3 please try again'})
      }if(doc){
        // console.log('secDoc  ' +doc)
      }
    })
  }
 
  else if(req.check_user) Person_player_id = 'center_player_id'

let bodyData =req.body
let finalData = Object.assign(bodyData, data)
const order_id = req.body.order_id
const filter = {_id:req.body.order_id}
if(finalData.hasOwnProperty('order_id')) delete finalData.order_id
 


// console.log('bodyData  ' + JSON.stringify(finalData))
// console.log('player_id  ' + Person_player_id)
// console.log(  '  order_id  '+ order_id)
// console.log('filter  ' + JSON.stringify(filter))

updatedOrder(Person_player_id ,JSON.stringify(filter) , (finalData) ,order_id , req , res)
  
}
// exports.accepted_by_center = (req , res) =>{

//   const data = { 
//     accepted_by_center: req.body.accepted_by_center ,
//     price: req.body.price ,
//     arrivalAt: req.body.arrivalAt ,
//     center_approvedAt: req.body.center_approvedAt ,
//     center_player_id:req.check_center.player_id
//     };
//     const order_id = req.body.order_id
//     const filter = {_id:order_id}
//     console.log('acceptedByCenter  ' + req.body )
//     // console.log( 'req.check_center.player_id   ' + req.check_center.player_id)
//    updatedOrder('user_player_id' ,filter , data ,order_id , req , res)
// }

// exports.accepted_by_user = async (req, res) =>{
//   const data = { 
//     accepted_by_user: req.body.accepted_by_user ,
//     paid:req.body.paid,
//     paidAt:req.body.paidAt
//     };
//     const order_id = req.body.order_id
//     const filter = {_id:order_id}
//     console.log('TEST ........  ' + req.body)
//     // res.status(200).send({data:'Test'})
//     updatedOrder('center_player_id' ,filter , data ,order_id , req , res)
// }

// exports.rejected_by_center = async(req , res)=>{
//   const data = { 
//     rejected_by_center: true,
//     accepted_by_center:false,
//     price:' ',
//     arrivalAt: ' ',

//     };
//     const order_id = req.body.order_id
//     const filter = {_id:order_id}
//     // console.log()
//    updatedOrder('user_player_id' ,filter , data ,order_id , req , res)
// }

//get
exports.orderForAll = (req , res)=>{
  //one function for center , admin , user , for getting order according to query params
  //we will recognize if it user or center or admin by the mw , and set the default value accordingly
  let obj2 = {}

  //we must set isActive true so user can get his order althought it active or not 
  // admin , cneter must get only active order
  if (req.check_center)  {obj2.country_id = req.check_center.country_id;obj2.isActive = true}
  else if (req.check_user) [obj2.user_id , obj2.rejected_by_center] = [req.check_user._id , false]
  else if(req.checkLogin_admin) obj2.isActive = true
  
  //get the query params and convert it to map array
  const map = new Map(Object.entries(req.query));

  //looping and return correct keys and value and err if null
  let obj = Array.from(map).reduce((obj, [key, value]) => (
    Object.assign(obj, {[chanageKeyValue(key)]: boolFromStringOtherwiseNull(value)
     }) 
  ), {});

  if(obj.hasOwnProperty('page_number') || obj.hasOwnProperty('limit'))
  {
    delete obj.limit
    delete obj.page_number
  }
  obj = Object.assign(obj2, obj)
// console.log(obj)

query(obj , req , res , req.query.page_number , req.query.limit)
}
  

exports.OrderTimeZoneForAdmin = (req , res)=>{
  Order.find({createdAt: { $gt: req.query.greater, $lt: req.query.smaller }  , isActive:true })
  // limit(10).
  //2000-06-06T21:00:52
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

exports.deactivate_order = (req , res) =>{
  if(req.body.greater && req.body.smaller){
    const data = { isActive: false };
    console.log('1')
    Order.findOneAndUpdate({ createdAt: { $gt: req.body.greater, $lt: req.body.smaller }  , isActive:true },
      data,
       {new: true} ,  (err, doc) => {
			if (err) {
				res.status(400).send({msg :'There\'s something wrong , please try again'})
			}
			if(doc){
        console.log(doc)
				res.status(200).send({msg:' Orders has been suspended	'})
			}
		})
	}
}

//param validation
 function query(params, req , res ,  page_number = 0, limit = 0 ){
  console.log(params) 
  console.log('page_number ' + page_number)
  console.log('limit ' + limit)
   Order.find(params)
  .limit(parseInt(limit))
  .skip(parseInt(page_number) * parseInt(limit))
  .populate('country_id' , 'name flag')
  .populate('section_id' , 'image description')
  .select('description rejected_by_center center_approvedAt section_id phone accepted_by_user location accepted_by_center price  arrivalAt  image paid paidAt createdAt updateddAt')
 
  .then(result =>{
    res.status(200).send({data:result})
  })
  .catch(err =>{
    res.status(400).send({msg:'err'})
  })
}

function boolFromStringOtherwiseNull(s) {
  if (s == 'true') return true
  if (s == 'false') return false
  if(s == null) res.status(400).send({mag:'err'})
  return s
}
function chanageKeyValue(k){
  if(k == 'acceptedByCenter') return 'accepted_by_center'
  if(k== 'acceptedByUser') return 'accepted_by_user'
  if(k == 'id') return '_id'
  if(k == 'rejectedByCenter') return 'rejected_by_center'
  return k
}
