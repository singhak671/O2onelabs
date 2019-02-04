var userSchema = require('../model/userModel');
var global_function = require('../commanfunction/funstion');

//=============================Register users ===========================//

const register = (req, res) => {
    var otp = global_function.getOTP();
    console.log('otp==>',otp);

    if (!req.body.fullname || !req.body.mobile_no || !req.body.countryCode) {
        res.json({
            responseCode: 403,
            resposeMessage: "Parameter missing !!"
        })
    } else {
        var fullname = req.body.fullname;
        var mobile_no = req.body.mobile_no;
        var countryCode = req.body.countryCode;

        userSchema.findOne({ 'mobile_no': countryCode+mobile_no }, (err, result) => {
            if (err) {
                res.json({
                    responseCode: 500,
                    resposeMessage: "Internal Server Error"
                })
            }
            else if (result) {
                res.json({
                    responseCode: 409,
                    resposeMessage: "Mobile Number already exist !!"
                })
            } else if (!result) {

                var userData = new userSchema({
                    fullname: fullname,
                    mobile_no: countryCode + mobile_no,
                    countryCode: countryCode
                })

                userData.save((err, succ) => {
                    if (err) {
                        res.json({
                            responseCode: 500,
                            resposeMessage: "Internal Server error"
                        })
                    } else {
                        res.json({
                            responseCode: 200,
                            resposeMessage: "Registration successfully !!",
                            result: succ
                        })
                    }
                })
            }
        })
    }
}

//========================== find number of users==================================//

const no_of_users = (req, res) => {
    userSchema.find({}).count((err, result) => {
        if (err) {
            res.json({
                responseCode: "500",
                resposeMessage: "Internal server error !!"
            })
        }
        else {
            res.json({
                responseCode: "200",
                resposeMessage: "Data found successfully !!",
                no_of_users: result
            })
        }
    })
}

//========================== send otp on user's mobile number ========================//

const sendOtp = (req, res) => {

    if (!req.body.userId) {
        res.json({
            responseCode: "403",
            resposeMessage: "Parameter missing !!"
        })
    } else {

        var userId = req.body.userId;

        userSchema.findById({ '_id': userId }, (err, result) => {
            if (err) {
                res.json({
                    responseCode: "500",
                    resposeMessage: "Internal server error"
                })
            } else if (result.mobile_no == 0) {

                res.json({
                    responseCode: "404",
                    resposeMessage: "Data not found,Mobile number reqister first !!"
                })
            } else if (result.mobile_no) {

                var otp = global_function.getOTP();
                console.log('otp===>',otp);

                global_function.sendOTP(`Your otp is :  ${otp}`, result.mobile_no, (err, sent) => {
                    if (err) {
                        res.json({
                            responseCode: "500",
                            resposeMessage: "Internal server error",
                            error: err

                        })
                    } else {
                        userSchema.findByIdAndUpdate({ '_id': userId }, { $set: { 'otp': otp } }, { new: true }, (err, succ) => {
                            if (err) {
                                res.json({
                                    responseCode: "500",
                                    resposeMessage: "Internal server error !"
                                })
                            } else {
                                res.json({
                                    responseCode: "200",
                                    resposeMessage: "OTP send successfully on your registerd mobile number",
                                    data: succ
                                })
                            }

                        })
                    }
                })
            }
        })
    }
}

//=============================Edit mobile number ========================/

const edit_mobile_no = (req, res) => {
    if (!req.body.userId) {
        re.json({
            responseCode: "403",
            resposeMessage: "Parameter mising !!"
        })
    } else {

        var userId = req.body.userId;
        var countryCode = req.body.countryCode;
        var mobile_no = req.body.mobile_no;

        userSchema.findByIdAndUpdate({ '_id': userId }, { $set: { 'mobile_no': countryCode + mobile_no } }, { new: true }, (err, update) => {
            if (err) {
                res.json({
                    responseCode: "500",
                    resposeMessage: "Internal server error !!"
                })
            } else {
                res.json({
                    responseCode: "200",
                    resposeMessage: "Mobile number update successfully !!!",
                    data: update
                })
            }
        })
    }
}

//=========================show mobile number using otp & fullname=============//

const show_mobile_no = (req, res) => {
    if (!req.body.search) {
        res.json({
            responseCode: "403",
            resposeMessage: "Parameter missing !!"

        })

    } else {
        var search = req.body.search;

        let query = {
            $or:[{fullname:{$regex: new RegExp(search, "ig")}},{otp:{$regex: new RegExp(search, "ig")}}]
        }

        userSchema.findOne(query,(err,result)=>{
            if(err){
                res.json({
                    responseCode:"500",
                    resposeMessage:"Internal server error"
                })
            }else if(result.otp){
                res.json({
                    responseCode:"200",
                    resposeMessage:"Data found successfully !!",
                    mobile_no: result.mobile_no
                })
            }else if(result.otp == 0){

                res.json({
                    responseCode:"404",
                    resposeMessage:" send otp first on your number"
                })
            }
        })

    }
}

module.exports = {
    register,
    no_of_users,
    sendOtp,
    edit_mobile_no,
    show_mobile_no

}