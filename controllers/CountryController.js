'use strict';
const mongoose = require('mongoose');
var moment = require('moment');
const Country = require('../models/country')
const uuidv1 = require('uuid/v1');
var base64Img = require('base64-img');

exports.add_country = (req , res)=>{
    if(req.body.file){
          var name = uuidv1();
          var 
          Filepath = "./public/" ;
          var imgPath = base64Img.imgSync(req.body.file, Filepath, name);
          var img = imgPath.split("/", 2)
        const country = new Country({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
			flag:img[1],
			count:0,
            isActive: true,
            createdAt:  moment().format('DD/MM/YYYY'),
            updateddAt: moment().format('DD/MM/YYYY'),
        })
        country.save()
        .then(result =>{
            res.status(200).send({msg : 'country added'})
        })
        .catch(err =>{
            res.status(400).send({msg:'Somthing went wrong'})
        })
      
    }else{
        res.status(400).send({msg:'image is required'})
    }
  
}

exports.update = async(req , res) => {
	if(!req.body.name){
		res.send.status(400).send({msg :'Please inter the required field'})
	}else{
		const data = { 
			name: req.body.name ,
			updateddAt: moment().format('DD/MM/YYYY')
			};
			const filter = { _id:req.body.id ,isActive:true}
		await Country.findOneAndUpdate(filter, data, {
			new: true
		  } ,  (err, doc) => {
			if (err) {
				res.status(400).send({msg :'There\'s something wrong , please try again'})
			}
		
			res.status(200).send({data : 'Done'})
		});
	}
}
exports.get_country = async(req , res)=>{
	Country.find({isActive:true})
	.select('description count name flag')
	.then(result =>{
		res.status(200).send({data:result})
	})
	.catch(err =>{
		res.status(400).send({msg:'err'})
	})
}

exports.CountryInactive = async(req , res)=>{
	if(req.body.id){
		const filter = { _id: req.body.id };
		const data = { isActive: false };
		Country.findOneAndUpdate(filter, data, {new: true} ,  (err, doc) => {
			if (err) {
				res.status(400).send({msg :'There\'s something wrong , please try again'})
			}
			if(doc){
				res.status(200).send({msg:' Country has been suspended'})
			}
		})
	}
}