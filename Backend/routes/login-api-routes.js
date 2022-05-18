const myRepository= require('../DB/loginRepository')
const express = require('express');
const cors = require('cors');
const router = express.Router();

const jwt = require('jsonwebtoken');
require("dotenv").config();

const isDevelopment = true; 

 if(isDevelopment){
    router.use(cors({origin: "http://localhost:3006", optionsSuccessStatus: 200}));
 }

function nothing(){}


//--------------------------------------
// Add new user
router.get('/', isDevelopment ? cors() : nothing(), async (req, res)=> {

    let myJson = await myRepository.getAllUsersFromDB();
    res.send(myJson);
 });
 
 //--------------------------------------
 // Get user by email
 router.get("/:email", isDevelopment ? cors() : nothing(),async (req,res)=>{
 
    console.log(req.params.email);
    console.log(req.params.password);

    if((req.params.email != "" )&& (req.params.password != "")){
        res.send(await myRepository.findUserByEmail(req.params.email));
    }
    else{
        res.send("errroorrr");
    }
 });


 // Add new user
router.post("/login" ,isDevelopment ? cors() : nothing(), async (req,res)=>{

   const temp = await myRepository.checkLogin(req.body.email,req.body.password);
   if(temp === false)
   {
   res.send("Error!! Password or email are incorrect");
   }
   else{
   const username = req.body.email;
   const user = {email: username}; 
   
   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
   console.log(accessToken);
   res.json({email: username,accessToken:accessToken});
   }
 });


 

module.exports = router;