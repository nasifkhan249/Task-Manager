const UsersModel=require("../../models/UsersModel");
const OTPModel=require("../../models/OTPModel");
const CreateToken=require("../../utility/CreateToken");
const SendEmailUtility=require("../../utility/SendEmailUtility");
const {upgrade} = require("nodemailer/.ncurc");
exports.registration=async (req)=>{
   try {
       let reqBody=req.body;
       let data=await UsersModel.create(reqBody);
       return {status:"success",data:data};

   }catch (e) {
       return {status:"fail",data:e}
   }

}

exports.login=async (req)=>{
    try{
        let reqBody=req.body;
        let data=await UsersModel.aggregate([{$match:reqBody},{$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}]);
        if(data.length>0){
            let token=await CreateToken(data[0]['email']);
            return {status:"success",token:token,data:data[0]}
        }
    }catch (e) {
        return {status:"fail",data:e};
    }
}


exports.profileUpdate=async (req)=>{
    try {
        let email=req.headers.email;
        let reqBody= {...req.body};
        delete reqBody.email

        let data=await UsersModel.updateOne({email:email},{$set:reqBody},{upsert:true});
        return{status:"success",data:data}
    }catch (e) {
        return{status:"fail",data:e}
    }
}

exports.ProfileDetails=async (req)=>{
    try{
        let email=req.headers.email;
        let data=await UsersModel.aggregate([{$match:{email:email}},{$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}])
        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}
    }
}


exports.RecoveryVerifyEmail=async (req)=>{
    try {
        let email=req.params.email;
        let OTPCode=Math.floor(100000+Math.random()*900000);

        let UserCount=await UsersModel.aggregate([{$match:{email:email}},{$count:"total"}]);

        if(UserCount.length>0){
            await OTPModel.updateOne({email:email},{$set:{otp:OTPCode}},{upsert:true});
            let sendEmail=await SendEmailUtility(email,"Your Verification code is= "+OTPCode,"Task Manager PIN Verification");
            return {status:"success",data:sendEmail}
        }else{
            return {status:"fail",data:"User Not Found"}
        }
    }catch (e) {
        return {status:"fail",data:e}
    }
}


exports.RecoveryVerifyOTP=async (req)=>{
    try {
        let email=req.params.email;
        let otp=req.params.otp;
        let status=0;
        let statusUpdated=1;

        let OTPCount=await OTPModel.aggregate([{$match:{email:email,otp:otp,status:status}},{$count:'total'}]);

        if(OTPCount.length>0){
            let OTPUpdate= await OTPModel.updateOne({email:email},{$set:{status:statusUpdated}},{upsert:true});
            return {status:"success",data:OTPUpdate}
        }else{
            return {status:"fail",data:"Invalid OTP"}
        }
    }catch (e) {
        return {status:"fail",data:e}
    }
}

exports.RecoveryVerifyResetPass=async (req)=>{
        try{
            let email=req.body['email'];
            let otp=req.body['otp'];
            let NewPass=req.body['password'];
            let status=0;
            let statusUpdated=1;

            let OTPMatch= await OTPModel.aggregate([{$match:{email:email,otp:otp,status:statusUpdated}},{$count:"total"}]);
            if(OTPMatch.length>0){
                await UsersModel.updateOne({email:email},{$set:{password:NewPass}},{upsert:true});
                await OTPModel.updateOne({email:email},{$set:{otp:0,status:status}});
                return {status:"success",data:"Password Reset SuccessFully"}
            }else{
                return {status:"fail",data:"Invalid Request"}
            }

        }catch (e) {
            return {status:"fail",data:e.toString()}
        }
}


