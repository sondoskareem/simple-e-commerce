
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
        'count':Joi.string().required(),
        'time':Joi.string().required(),
    }
    return Joi.validate(User, UserSchema);
}
exports.Accept_Center=function (Accept_Center) {
    const Accept_CenterSchema = {
        'price': Joi.string().required(),
        'arrivalAt': Joi.string().required(),
        'order_id': Joi.string().required(),
        'accepted_by_center': Joi.string().required(),
        'center_approvedAt':Joi.string().required(),
        'count':Joi.string().required(),
        'section_id' :Joi.string().required(),
    }
    return Joi.validate(Accept_Center, Accept_CenterSchema);
}

exports.Reject_Center=function (Reject_Center) {
    const Reject_CenterSchema = {
        'order_id': Joi.string().required(),
        'rejected_by_center': Joi.string().required(),
        'center_approvedAt':Joi.string().required(),
        'count':Joi.string().required(),
        'section_id' :Joi.string().required(),
    }
    return Joi.validate(Reject_Center, Reject_CenterSchema);
}

exports.User_Accept=function (User_Accept) {
    const User_AcceptSchema = {
        'paid': Joi.string().required(),
        'paidAt': Joi.string().required(),
        'order_id': Joi.string().required(),
    }
    return Joi.validate(User_Accept, User_AcceptSchema);
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
