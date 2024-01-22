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


