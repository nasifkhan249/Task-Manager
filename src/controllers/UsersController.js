const {registration, login, profileUpdate, ProfileDetails, RecoveryVerifyEmail, RecoveryVerifyOTP,
    RecoveryVerifyResetPass
} = require("../services/users/userServices");
exports.signUp=async (req,res)=>{
    let result=await registration(req);
    res.status(200).json(result);
};
exports.signIn = async (req, res) => {
    let result = await login(req);
    if (result['status'] === "success") {
        let cookieOption = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: false,
            sameSite: true
        }
        res.cookie('token', result['token'], cookieOption);
        return res.status(200).json(result);
    } else {
        return res.status(200).json(result);
    }
}


exports.UserLogout=async (req,res)=>{
    let cookieOption={
        expires  : new Date(Date.now()-24*60*60*1000),
        httpOnly : false
    }
    res.cookie('token', "",cookieOption);
    return res.status(200).json({status:"success"})
}

exports.UpdateProfile=async (req,res)=>{
    let result=await profileUpdate(req);
    res.status(200).json(result);
}

exports.DetailsProfile=async (req,res)=>{
    let result=await ProfileDetails(req);
    res.status(200).json(result);
}

exports.VerifyEmail=async (req,res)=>{
    let result=await RecoveryVerifyEmail(req);
    res.status(200).json(result);
}

exports.VerifyOTP=async (req,res)=>{
    let result=await RecoveryVerifyOTP(req);
    res.status(200).json(result);
}

exports.VerifyResetPass=async (req,res)=>{
    let result=await RecoveryVerifyResetPass(req);
    res.status(200).json(result);
}