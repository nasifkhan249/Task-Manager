// Basic Lib Import
const path = require('path');
const express =require('express');
const router =require('./src/routes/api');
const app= new express();
const bodyParser =require('body-parser');
const cookieParser=require("cookie-parser")

// Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');



// Database Lib Import
const mongoose =require('mongoose');

// Security Middleware Implement
app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter);


// Mongo DB Database Connection
let URI="mongodb+srv://<username>:<password>@cluster0.3tc0jcc.mongodb.net/TaskManager?retryWrites=true&w=majority";
let OPTION={user:'khannasif98',pass:'kutkut7220',autoIndex:true}

mongoose.connect(URI,OPTION).then(()=>{
    console.log("Connection Success")
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
})




// Routing Implement
app.use("/api/v1",router)


module.exports=app;
