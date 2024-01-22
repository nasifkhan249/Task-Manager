const {registration, login, profileUpdate, ProfileDetails, RecoveryVerifyEmail, RecoveryVerifyOtp,
    RecoveryVerifyPassword
} = require("../services/users/userServices");
exports.signUp=async (req,res)=>{
    let result=await registration(req);
    res.status(200).json(result);
};

exports.signIn=async (req,res)=>{
    let result=await login(req);
    res.status(200).json(result);
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
    let result=await RecoveryVerifyOtp(req);
    res.status(200).json(result);
}

exports.VerifyResetPass=async (req,res)=>{
    let result=await RecoveryVerifyPassword(req);
    res.status(200).json(result);
}