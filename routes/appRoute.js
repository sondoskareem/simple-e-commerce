'use strict';

module.exports = function(path,app) {
	// var UsersMW = require('../mw/check_user');
	// var licensecheck = require('../mw/license_check');
    // var checkLogin_admin = require('../mw/check_login');
    
    var User = require('../controllers/UserController');
	app.route(`${path}/auth/register`).post(User.create_a_User);
	app.route(`${path}/auth/login`).post(User.loginUser);
	app.route(`${path}/users`).get(User.users);
}