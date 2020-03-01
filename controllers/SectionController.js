'use strict';
const mongoose = require('mongoose');
var moment = require('moment');
const Sections = require('../models/sections')
const uuidv1 = require('uuid/v1');
var base64Img = require('base64-img');
exports.add_section = (req , res)=>{
	if(req.body.file){
        // console.log(req.body.file)
          var name = uuidv1();
          var Filepath = "./public/" ;
          var imgPath = base64Img.imgSync(req.body.file, Filepath, name);
          //local \\ , on server must split on /
        var img = imgPath.split("/", 2)
     
    const section = new Sections({
        _id: new mongoose.Types.ObjectId(),
		description: req.body.description,
		image: img[1],
		isActive: true,
        createdAt:  moment().format('DD/MM/YYYY'),
        updateddAt: moment().format('DD/MM/YYYY'),
    })
    section.save()
    .then(result =>{
        res.status(200).send({msg : 'Section added'})
    })
    .catch(err =>{
        res.status(400).send({msg:'Somthing went wrong'})
	})
}
}

exports.update = async(req , res) => {
	if(!req.body.description){
		res.send.status(400).send({msg :'Please inter the required field'})

	}else{
		const data = { 
			description: req.body.description ,
			updateddAt: moment().format('DD/MM/YYYY')
			};
			const filter = { _id:req.body.section_id }

		await Sections.findOneAndUpdate(filter, data, {
			new: true
		  } ,  (err, doc) => {
			if (err) {
				res.status(400).send({msg :'There\'s something wrong , please try again'})
			}
		
			res.status(200).send({data : 'Done'})
		});
	}
}
exports.get_section = async(req , res)=>{
	Sections.find({isActive:true})
	.select('description')
	.then(result =>{
		res.status(200).send({data:result})
	})
	.catch(err =>{
		res.status(400).send({msg:'err'})
	})
}