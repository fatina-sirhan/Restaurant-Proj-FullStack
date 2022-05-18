const myRepository= require('../DB/myRepository')
const express = require('express');
const cors = require('cors');
const router = express.Router();


const isDevelopment = true; 

 if(isDevelopment){
    router.use(cors({origin: "http://localhost:3006", optionsSuccessStatus: 200}));
 }

function nothing(){}

//--------------------------------------
// Get all reservations
router.get('/', isDevelopment ? cors() : nothing(), async (req, res)=> {

   let myJson = await myRepository.getAllReservationsFromDB();
   res.send(myJson);
});

//--------------------------------------
// Get reservations by id
router.get("/:email", isDevelopment ? cors() : nothing(),async (req,res)=>{

   console.log(req.params.id);
   res.send(await myRepository.findReservationById(req.params.email));
});

//--------------------------------------
// Add new reservation
router.post("/new-reservation" ,isDevelopment ? cors() : nothing(), async (req,res)=>{

   console.log("The req.body from path new reservation: ");
   console.log(req.body);
   const isAllOk = await myRepository.addReservation(req.body);
   res.send(isAllOk);
});


//--------------------------------------

router.post("/add-join-table" ,isDevelopment ? cors() : nothing(), async (req,res)=>{

   console.log("The req.body from path new reservation: ");
   console.log(req.body);
   const isAllOk = await myRepository.addJoinTable(req.body);
   res.send(isAllOk);
});

//--------------------------------------

router.post("/check-join-table" ,isDevelopment ? cors() : nothing(), async (req,res)=>{

   console.log("The req.body from path new reservation: ");
   console.log(req.body);
   const isAllOk = await myRepository.checkJoinTable(req.body);
   res.send(isAllOk);
});


//--------------------------------------
// update total number of people in booking table 
router.put("/:id", isDevelopment ? cors() : nothing(), async (req,res)=>{

   let updateRes = await myRepository.updateTotalNumInBookingTable(req.params.id, req.body);
   res.send(updateRes);
});


//--------------------------------------
// update reservations
router.put("/change/:id", isDevelopment ? cors() : nothing(), async (req,res)=>{

   // console.log(req.params.id);
   // console.log(req.body);
   let updateRes = await myRepository.updateReservation(req.params.id, req.body);
   res.send(updateRes);
});

//--------------------------------------
// delete reservations by id
router.delete("/:id", isDevelopment ? cors() : nothing(), async (req,res)=>{
   console.log(req.params.id);
   const result = await myRepository.deleteReservationById(req.params.id);
   res.send(result);
});


module.exports = router;