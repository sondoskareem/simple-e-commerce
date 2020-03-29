const Section = require('../models/sections')

exports.check_section= function (req, res, next) {
	var section_id = req.body.section_id
    Section.findOne({_id: section_id  , isActive:true})
		.then(result =>{
			if(result){
				console.log(result)
				req.check_section = result
				next()
				}else{
                    res.status(400).send({ msg: 'Check your inputs' })
                }
			})
		.catch(err =>{
			res.status(400).send({ msg: 'Check your inputs' })
			})
			
	}
		