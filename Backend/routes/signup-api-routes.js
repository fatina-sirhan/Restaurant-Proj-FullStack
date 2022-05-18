const myRepository= require('../DB/signupRepository')
const express = require('express');
const cors = require('cors');
const router = express.Router();


const isDevelopment = true; 

 if(isDevelopment){
    router.use(cors({origin: "http://localhost:3006", optionsSuccessStatus: 200}));
 }

function nothing(){}


//--------------------------------------
// Add new user
router.post("/new-signup" ,isDevelopment ? cors() : nothing(), async (req,res)=>{

   console.log("The req.body from path new reservation: ");
   console.log(req.body);
   const isAllOk = await myRepository.addNewUser(req.body, req.body.password, req.body.confirmPassword);
   res.send(isAllOk);
});


module.exports = router;