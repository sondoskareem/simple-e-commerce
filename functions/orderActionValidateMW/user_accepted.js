var UserValidation = require('../../validation/UserValidation');



exports.user_accepted= function (req, res, next) {
    if (req.check_user){
        validating = UserValidation.User_Accept(req.body);
        if (validating.error) res.status(400).send({ msg: validating.error.details[0].message })
        else next();
    }
    
    else next();
}