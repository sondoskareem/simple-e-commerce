'use strict';
const mongoose = require('mongoose');
var moment = require('moment');
const Sections = require('../models/sections')

exports.add_section = (req , res)=>{
    const section = new Sections({
        _id: new mongoose.Types.ObjectId(),
        description: req.body.description,
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