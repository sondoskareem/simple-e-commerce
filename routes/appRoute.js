'use strict';

module.exports = function(path,app) {
    var checkLogin_admin = require('../mw/check_login');
    var check_user = require('../mw/check_user');
    var check_center = require('../mw/check_center');
    var check_country = require('../mw/check_country');
    var generalUser = require('../mw/generalUser');
	var check_code_confirmation = require('../mw/check_code_confirmation');
	
	var center_accepted = require('../functions/orderActionValidateMW/center_accepted');
	var center_rejected = require('../functions/orderActionValidateMW/center_rejected');
	var user_accepted = require('../functions/orderActionValidateMW/user_accepted');
	
	var User = require('../controllers/UserController');
	var Section = require('../controllers/SectionController');
	var Order = require('../controllers/OrderController');
	var Country = require('../controllers/CountryController');
	var Driver = require('../controllers/DriverController');
	
	app.route(`${path}/auth/admin`).post(User.CreateAdmin);
	app.route(`${path}/auth/register`).post(User.create_a_User);
	app.route(`${path}/auth/registerCenterCall`).post(checkLogin_admin.checkLogin_admin,User.create_a_CenterCallUser);
	app.route(`${path}/auth/login`).post(User.loginUser);

	app.route(`${path}/email/confirmation`).post( check_code_confirmation.check_email_code, User.confirm_email);
	app.route(`${path}/resend/confirmation`).post(User.resend_code);

	app.route(`${path}/center/forget`).post(checkLogin_admin.checkLogin_admin,User.centerForgetPassword);
	app.route(`${path}/user/forget`).post(check_code_confirmation.check_email_code,User.UserForgetPassword);

	app.route(`${path}/users`).get(checkLogin_admin.checkLogin_admin, User.users);
	app.route(`${path}/user`).get(generalUser.generalUser, User.user_by_token);

	app.route(`${path}/section/add`).post(checkLogin_admin.checkLogin_admin, Section.add_section);
	app.route(`${path}/section`).get(generalUser.generalUser, Section.get_section);
	app.route(`${path}/section/update`).post(checkLogin_admin.checkLogin_admin, Section.update);

	app.route(`${path}/country/add`).post(checkLogin_admin.checkLogin_admin, Country.add_country);
	app.route(`${path}/country`).get( Country.get_country);
	app.route(`${path}/country/update`).post(checkLogin_admin.checkLogin_admin, Country.update);

	app.route(`${path}/country/suspend`).post(checkLogin_admin.checkLogin_admin, Country.CountryInactive);
	app.route(`${path}/user/suspend`).post(checkLogin_admin.checkLogin_admin, User.UserInactive);
	app.route(`${path}/section/suspend`).post(checkLogin_admin.checkLogin_admin, Section.SectionInactive);
	app.route(`${path}/order/suspend`).post(checkLogin_admin.checkLogin_admin, Order.deactivate_order);

	app.route(`${path}/order/create`).post(check_user.check_user,check_country.check_country, Order.add_order);

	app.route(`${path}/order/acceptedByCenter`).post(check_center.check_center,center_accepted.center_accepted, Order.orderActionAccordingToUserType);
	app.route(`${path}/order/rejectedByCenter`).post(check_center.check_center,center_rejected.center_rejected, Order.orderActionAccordingToUserType);
	app.route(`${path}/order/acceptedByUser`).post(check_user.check_user,user_accepted.user_accepted, Order.orderActionAccordingToUserType);

	app.route(`${path}/order/center`).get(check_center.check_center, Order.orderForAll);
	app.route(`${path}/order/user`).get(check_user.check_user, Order.orderForAll);
	app.route(`${path}/order/admin`).get(checkLogin_admin.checkLogin_admin, Order.orderForAll);

	app.route(`${path}/order/timeZone`).get(checkLogin_admin.checkLogin_admin, Order.OrderTimeZoneForAdmin);
	app.route(`${path}/order/timePeriod`).get(checkLogin_admin.checkLogin_admin, Order.Subtraction_OrderTimeZoneForAdmin);

	app.route(`${path}/driver`).post(check_user.check_user, Driver.CreateDriver);
	app.route(`${path}/driver`).get(checkLogin_admin.checkLogin_admin, Driver.getDrivers);


	app.route(`${path}/ordeers`).get(check_center.check_center, Order.orderActionAccordingToUserType);

}