const express =require('express');
const UsersController=require("../controllers/UsersController");
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");


const router =express.Router();


router.post("/signup",UsersController.signUp);
router.post("/signin",UsersController.signIn);
router.post("/update",AuthVerifyMiddleware,UsersController.UpdateProfile);
router.get("/details",AuthVerifyMiddleware,UsersController.DetailsProfile);
router.get("/verifyemail/:email",UsersController.VerifyEmail);
router.get("/verifyotp/:email/:otp",UsersController.VerifyOTP);
router.post("/resetpassword",UsersController.VerifyResetPass);


module.exports=router;






































module.exports=router;