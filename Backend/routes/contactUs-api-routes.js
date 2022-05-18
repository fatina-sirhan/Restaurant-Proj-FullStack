const myRepository= require('../DB/contactRequestRepository')
const express = require('express');
const cors = require('cors');
const router = express.Router();


const isDevelopment = true; 

 if(isDevelopment){
    router.use(cors({origin: "http://localhost:3006", optionsSuccessStatus: 200}));
 }

function nothing(){}

//--------------------------------------
// Get all "contact us" requests
// router.get('/', isDevelopment ? cors() : nothing(), async (req, res)=> {

//    let myJson = await myRepository.getAllReservationsFromDB();
//    res.send(myJson);
// });

//--------------------------------------
// Get request by email
// router.get("/:email", isDevelopment ? cors() : nothing(),async (req,res)=>{

//    console.log(req.params.id);
//    res.send(await myRepository.findReservationById(req.params.id));
// });

//--------------------------------------
// Add new request
router.post("/new-request" ,isDevelopment ? cors() : nothing(), async (req,res)=>{

   console.log("The req.body from path new contact request: ");
   console.log(req.body);
   const isAllOk = await myRepository.addContactRequest(req.body);
   res.send(isAllOk);
});

//--------------------------------------
// update "contact us" requests
// router.put("/:email", isDevelopment ? cors() : nothing(), async (req,res)=>{

//    let updateRes = await myRepository.updateReservation(req.params.id, req.body);
//    if(parseInt(updateRes)  === 0)
//       res.send("There is NO reservation with this id!!");
//    else
//       res.send("The reservation has been updated")
// });

//--------------------------------------
// delete request by email
// router.delete("/:email", isDevelopment ? cors() : nothing(), async (req,res)=>{

//    console.log(req.params.id);
//    const result = await myRepository.deleteReservationById(req.params.id);
// if(parseInt(result)  === 0)
//    res.send("There is NO reservation with this id!!");
// else
//    res.send("The reservation has been deleted");
// });


module.exports = router;