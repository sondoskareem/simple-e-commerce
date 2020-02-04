
const Joi = require('joi');


exports.new_user=function (User) {
    const UserSchema = {
        'name': Joi.string().required(),
        'phone': Joi.number().min(6).required(),
        'password': Joi.string().min(6).required(),
        'email': Joi.string().email().required(),
        'location':Joi.string().required(),
        'role':Joi.string().required(),
        'player_id':Joi.string().required(),
        
    }
    return Joi.validate(User, UserSchema);
}

    // "bcrypt": "^3.0.6",
    // "joi": "^14.3.1", 
