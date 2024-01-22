const jwt=require("jsonwebtoken");

exports.AuthVerifyMiddleware=async (req,res,next)=>{
    try{
        const token=req.headers['token'];
        jwt.verify(token,'12345',(err,decoded)=>{
            if(err){
                res.status(401).json({status:"unauthorized"})
            }else{
                let email=decoded['data'];
                req.headers.email=email;
                next();
            }
        })
    }catch (e) {
        return res.status(401).json({status:"fail",e:console.log(e)})
    }
}