'use strict';

module.exports = function(path,app) {
	// var UsersMW = require('../mw/check_user');
	// var licensecheck = require('../mw/license_check');
    var checkLogin_admin = require('../mw/check_login');
    var check_user = require('../mw/check_user');
    
	var User = require('../controllers/UserController');
	var Section = require('../controllers/SectionController');
	var Order = require('../controllers/OrderController');
	
	app.route(`${path}/auth/register`).post(User.create_a_User);
	app.route(`${path}/auth/login`).post(User.loginUser);
	app.route(`${path}/forget/password`).post(User.forgetPassword);
	app.route(`${path}/users`).get(checkLogin_admin.checkLogin_admin, User.users);

	app.route(`${path}/section/add`).post(checkLogin_admin.checkLogin_admin, Section.add_section);
	app.route(`${path}/section/update`).post(checkLogin_admin.checkLogin_admin, Section.update);

	app.route(`${path}/order/create`).post(check_user.check_user, Order.add_order);


}