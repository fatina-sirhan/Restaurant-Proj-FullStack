const myRepository= require('../DB/cartItemsRepository')
const express = require('express');
const cors = require('cors');
const router = express.Router();


const isDevelopment = true; 

 if(isDevelopment){
    router.use(cors({origin: "http://localhost:3006", optionsSuccessStatus: 200}));
 }

function nothing(){}

//--------------------------------------
// Get all the items in menu 
router.get('/', isDevelopment ? cors() : nothing(), async (req, res)=> {

   let myJson = await myRepository.getAllMenuItemsFromDB();
   res.send(myJson);
});

//--------------------------------------
// Get menu item by id
router.get("/:email", isDevelopment ? cors() : nothing(),async (req,res)=>{

    console.log("fatinaaaa!!!!!***", req.params.email);
//    console.log(req.params.id);
   res.send(await myRepository.findMenuItemById(req.params.email));
});

//--------------------------------------
// Add new item to order array
router.post("/addOrder" ,isDevelopment ? cors() : nothing(), async (req,res)=>{

   console.log("The req.body from path new cart items: ");
   console.log(req.body);
   const isAllOk = await myRepository.addItemToTheCart(req.body);
   res.send(isAllOk);
});


//--------------------------------------
// delete reservations by id
router.delete("/:id", isDevelopment ? cors() : nothing(), async (req,res)=>{
    console.log(req.params.id);
    const result = await myRepository.deleteCartItemById(req.params.id);
    res.send(result);
 });



module.exports = router;



