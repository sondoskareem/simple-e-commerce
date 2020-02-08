'use strict';
const mongoose = require('mongoose');
var moment = require('moment');
const Country = require('../models/country')
const uuidv1 = require('uuid/v1');

exports.add_country = (req , res)=>{
    if(req.files.file){
        var file = req.files.file;
        var changetype = file.mimetype.split("/", 1);
        if (changetype == 'image') {
          let name = file.name;
          var FileUud = uuidv1();
          const ExtArr = file.mimetype.split("/", 2)
          var Filepath = "./public/" + FileUud + '.' + ExtArr[1];
          var urlFile = FileUud + '.' + ExtArr[1];
          file.mv(Filepath);
        const country = new Country({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            flag:urlFile,
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
      }
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
			const filter = { _id:req.body.id }

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
	Sections.find({isActive:true})
	.select('description flag')
	.then(result =>{
		res.status(200).send({data:result})
	})
	.catch(err =>{
		res.status(400).send({msg:'err'})
	})
}