
const Joi = require('joi');


exports.new_user=function (User) {
    const UserSchema = {
        'name': Joi.string().required(),
        'phone': Joi.number().min(6).required(),
        'password': Joi.string().min(6).required(),
        'email': Joi.string().email().required(),
        'location':Joi.string().required(),
        'player_id':Joi.string().required(),
        'country_id' :Joi.string().required(),
        
    }
    return Joi.validate(User, UserSchema);
}

exports.new_driver=function (driver) {
    const driverSchema = {
        'id_front': Joi.string().required(),
        'id_back': Joi.string().required(),
        'car_type': Joi.string().required(),
        'car_model': Joi.string().required(),
        'personal_img':Joi.string().required(),
        'form_img':Joi.string().required(),
        'license_img' :Joi.string().required(),
        
    }
    return Joi.validate(driver, driverSchema);
}
