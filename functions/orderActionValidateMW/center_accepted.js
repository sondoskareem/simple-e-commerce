var UserValidation = require('../../validation/UserValidation');


exports.center_accepted= function (req, res, next) {
    console.log('acce')
    if (req.check_center && req.url == '/api/v1/order/acceptedByCenter'){
        validating = UserValidation.Accept_Center(req.body);
        if (validating.error) res.status(400).send({ msg: validating.error.details[0].message })
        else{ next(); console.log('acc2')}
    }
    else {next(); console.log('acc3')};
} 