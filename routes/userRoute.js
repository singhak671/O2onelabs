var router = require('express').Router();
var userController = require('../controller/userController');

router.post('/register',userController.register); //registration
router.get('/no_of_users',userController.no_of_users); //no_of_users
router.post('/sendOtp',userController.sendOtp); //send OTP
router.post('/edit_mobile_no',userController.edit_mobile_no); //edit mobile number
router.post('/show_mobile_no',userController.show_mobile_no); //show mobile number
module.exports = router;