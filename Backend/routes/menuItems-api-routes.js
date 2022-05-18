const myRepository= require('../DB/menuItemsRepository')
const express = require('express');
const cors = require('cors');
const router = express.Router();


const isDevelopment = true; 

 if(isDevelopment){
    router.use(cors({origin: "http://localhost:3006", optionsSuccessStatus: 200}));
 }

function nothing(){}


router.get('/', isDevelopment ? cors() : nothing(), async (req, res)=> {

    let myJson = await myRepository.getAllMenuItemsFromDB();
    res.send(myJson);
 });


 module.exports = router;