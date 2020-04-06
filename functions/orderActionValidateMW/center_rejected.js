var UserValidation = require('../../validation/UserValidation');


exports.center_rejected= function (req, res, next) {
    if (req.check_center && req.url == '/api/v1/order/rejectedByCenter'){
        validating = UserValidation.Reject_Center(req.body);
        if (validating.error) res.status(400).send({ msg: validating.error.details[0].message })
        [data.price , data.arrivalAt , data.rejected_by_center , data.accepted_by_center] = [' ' , ' ' , true , false]
        else next();
    }
    
    else next();
}