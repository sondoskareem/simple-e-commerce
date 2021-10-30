const Country = require('../models/country')
const User = require('../models/users')

exports.check_country= function (req, res, next) {
	var country_id = req.body.country_id
	
    Country.findOne({_id: country_id  , isActive:true})
		.then(result =>{
                User.find({country_id:result._id , isActive:true , role:1})
                .then(userREsult =>{
                  
                    let obj = []
                    userREsult.forEach(user =>{
                        obj.push(user.player_id)
                        
                    })
                    req.check_country = obj
                    next()
                
                })
			})
		.catch(err =>{
			res.status(400).send({ msg: 'Check your inputs' })
			})
			
	}
		