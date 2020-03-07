'use strict';

module.exports = function(path,app) {
	// var UsersMW = require('../mw/check_user');
	// var licensecheck = require('../mw/license_check');
    var checkLogin_admin = require('../mw/check_login');
    var check_user = require('../mw/check_user');
    var check_center = require('../mw/check_center');
    var generalUser = require('../mw/generalUser');
    
	var User = require('../controllers/UserController');
	var Section = require('../controllers/SectionController');
	var Order = require('../controllers/OrderController');
	var Country = require('../controllers/CountryController');
	var Driver = require('../controllers/DriverController');
	var Charge = require('../controllers/ChargeController');
	
	app.route(`${path}/auth/admin`).post(User.CreateAdmin);
	app.route(`${path}/auth/register`).post(User.create_a_User);
	app.route(`${path}/auth/registerCenterCall`).post(checkLogin_admin.checkLogin_admin,User.create_a_CenterCallUser);
	app.route(`${path}/auth/login`).post(User.loginUser);
	app.route(`${path}/change/password`).post(check_user.check_user,User.changePassword);
	app.route(`${path}/forget/password`).post(User.changePassword);

	app.route(`${path}/users`).get(checkLogin_admin.checkLogin_admin, User.users);
	app.route(`${path}/user`).get(generalUser.generalUser, User.user_by_token);

	app.route(`${path}/section/add`).post(checkLogin_admin.checkLogin_admin, Section.add_section);
	app.route(`${path}/section`).get(generalUser.generalUser, Section.get_section);
	app.route(`${path}/section/update`).post(checkLogin_admin.checkLogin_admin, Section.update);

	app.route(`${path}/country/add`).post(checkLogin_admin.checkLogin_admin, Country.add_country);
	app.route(`${path}/country`).get( Country.get_country);
	app.route(`${path}/country/update`).post(checkLogin_admin.checkLogin_admin, Country.update);

	app.route(`${path}/order/create`).post(check_user.check_user, Order.add_order);
	app.route(`${path}/order/acceptedByCenter`).post(check_center.check_center, Order.accepted_by_center);
	app.route(`${path}/order/rejectedByCenter`).post(check_center.check_center, Order.rejected_by_center);
	app.route(`${path}/order/acceptedByUser`).post(check_user.check_user, Order.accepted_by_user);

	app.route(`${path}/order/center`).get(check_center.check_center, Order.orderForCenter);

	app.route(`${path}/order/user`).get(check_user.check_user, Order.OrderForUser);

	app.route(`${path}/order/admin`).get(checkLogin_admin.checkLogin_admin, Order.orderForAdmin);
	app.route(`${path}/order/timeZone`).get(checkLogin_admin.checkLogin_admin, Order.OrderTimeZoneForAdmin);
	app.route(`${path}/order/timePeriod`).get(checkLogin_admin.checkLogin_admin, Order.Subtraction_OrderTimeZoneForAdmin);

	app.route(`${path}/driver`).post(check_user.check_user, Driver.CreateDriver);
	app.route(`${path}/driver`).get(checkLogin_admin.checkLogin_admin, Driver.getDrivers);

	app.route(`${path}/charge`).post(check_user.check_user, Charge.charge);

}