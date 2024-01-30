const express =require('express');
const UsersController=require("../controllers/UsersController");
const TaskController=require("../controllers/TasksController");
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");


const router =express.Router();


router.post("/signup",UsersController.signUp);
router.post("/signin",UsersController.signIn);
router.get('/logout',AuthVerifyMiddleware,UsersController.UserLogout)
router.post("/update",AuthVerifyMiddleware,UsersController.UpdateProfile);
router.get("/details",AuthVerifyMiddleware,UsersController.DetailsProfile);
router.get("/verifyemail/:email",UsersController.VerifyEmail);
router.get("/verifyotp/:email/:otp",UsersController.VerifyOTP);
router.post("/resetpassword",UsersController.VerifyResetPass);



router.post("/createtask",AuthVerifyMiddleware,TaskController.TaskCreate)
router.post("/deletetask/:id",AuthVerifyMiddleware,TaskController.TaskDelete)
router.post("/updatetask/:id/:status",AuthVerifyMiddleware,TaskController.TaskUpdate)
router.get("/listtaskbystatus/:status",AuthVerifyMiddleware,TaskController.TaskListByStatus)
router.get("/taskcount",AuthVerifyMiddleware,TaskController.TaskCount)

module.exports=router;






































module.exports=router;