const reservationsModels = require('./models/signupModels');
const Reservation = reservationsModels.Signup;

var ObjectId = require('mongodb').ObjectID;


//--------------------------------------
// Get all reservations
const getAllReservationsFromDB = async () => {
    const allReservations = await Reservation.find();
    console.log(`getAllReservations ${JSON.stringify(allReservations)}`);
    return JSON.parse(JSON.stringify(allReservations));
};
exports.getAllReservationsFromDB = getAllReservationsFromDB;

//--------------------------------------
// Get info of a reservation by its id 
const findReservationById = async (reservationId) => {
    const x = await Reservation.findOne({ email: reservationId });
    console.log(`findReservationById ${JSON.stringify(x)}`);
    return x;
};
exports.findReservationById = findReservationById;


//--------------------------------------
// Check table to join - table elements
const checkJoinTable = async (newReservation) => {

    const allReservations = await Reservation.find();
    let arr = [];
    allReservations.map(u => {
        key={u};
        let filterd = u.bookingTable.filter((b) => {
            let jDate = new Date(newReservation.date);
            let bDate = new Date(b.date);
            return jDate.getTime() === bDate.getTime() 
            && b.joinStatus
            && (8 - b.totalNumberOfPeople) >= newReservation.numberOfPeople;
        });
        filterd.map(f => {
            key={f};
            arr.push({user:u._id, name:`${u.first} ${u.last}`,date: f.date, book:f._id, numberOfPeople:f.numberOfPeople,totalNumberOfPeople:f.totalNumberOfPeople, desc:f.desc});
        }) 
    });
    console.log(arr);
    return arr;
};
exports.checkJoinTable = checkJoinTable;


//---------------------------------------------
// Add a reservation to "booking table" -- Join a table 

const addJoinTable = async (newReservation) => {
    const allReservations = await Reservation.find({email: newReservation.email});

    const theObjToUpdate = await Reservation.findOneAndUpdate(
        { email: newReservation.email},
        { $push: { joiningTable:{
            userIdOfTheTableJoiningIt: newReservation.userIdOfTheTableJoiningIt,
            idOfTheTableJoiningIt: newReservation.idOfTheTableJoiningIt,
            numberOfPeople: newReservation.numberOfPeople,
            date: newReservation.date,
            joinStatus: newReservation.joinStatus,
            totalNumberOfPeople: Number(newReservation.numberOfPeople) + Number(newReservation.totalNumberOfPeopleInBookingTable)
    }}});
    
    console.log(`updateReservationByID ${JSON.stringify(theObjToUpdate)}`);
    return theObjToUpdate;
}
exports.addJoinTable=addJoinTable;


//--------------------------------------
// Update total number of people field in booking table array
const updateTotalNumInBookingTable = async (theID, theReservInfoObj) => {

    // update total number of people in booking table 
    const theObjToUpdate = await Reservation.findOneAndUpdate(
    {
        _id: ObjectId(theID),
        "bookingTable": {
           "$elemMatch":{
             _id: theReservInfoObj.idOfTheTableJoiningIt
           }}
       },
       { 
        "$set":{
        "bookingTable.$.totalNumberOfPeople": Number(theReservInfoObj.numberOfPeople) + Number(theReservInfoObj.totalNumberOfPeopleInBookingTable)
    }});

    //---------------------TODO------------------------
    //update total number of people in joining table 
    // const theObjToUpdateJoining = await Reservation.findOneAndUpdate(
    //     {
    //     userIdOfTheTableJoiningIt: theID,
    //     "joiningTable": {
    //         "$elemMatch":{
    //             idOfTheTableJoiningIt: theReservInfoObj.idOfTheTableJoiningIt
    //         }}
    //     },
    //     { 
    //         "$set":{
    //         "joiningTable.$.totalNumberOfPeople": Number(theReservInfoObj.numberOfPeople) + Number(theReservInfoObj.totalNumberOfPeopleInBookingTable)
    //     }});


    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmm",theReservInfoObj.totalNumberOfPeopleInBookingTable);

    const theObjToUpdateJoining = await Reservation.updateMany(
        {
            "joiningTable.idOfTheTableJoiningIt":theReservInfoObj.idOfTheTableJoiningIt
        },
        { 
            "$set":{
            "joiningTable.$.totalNumberOfPeople": Number(theReservInfoObj.numberOfPeople) + Number(theReservInfoObj.totalNumberOfPeopleInBookingTable) 
        }});

    // const theObjToUpdateJoining = await Reservation.updateMany(

    //     {
    //     "joiningTable": {
    //         "$elemMatch":{
    //         idOfTheTableJoiningIt: theReservInfoObj.idOfTheTableJoiningIt
    //         }}
    //     },
    //     { 
    //         "$set":{
    //         "joiningTable.$.totalNumberOfPeople": Number(theReservInfoObj.numberOfPeople) + Number(theReservInfoObj.totalNumberOfPeopleInBookingTable)
    //     }});


        
};
exports.updateTotalNumInBookingTable = updateTotalNumInBookingTable;


//--------------------------------------
// Add a reservation 
const addReservation = async (newReservation) => {
    console.log("--", JSON.stringify(newReservation));
    const allReservations = await Reservation.find({date: newReservation.date});

    console.log(allReservations);
    console.log(allReservations.length);

    if(newReservation.numberOfPeople > 8){
        return (`Unfortunately, your party is too large to make an online reservation.
Please, contact the restaurant directly. Phone: +01 234 567 890`);
    }

    if(allReservations.length+1 > 10){
        return(`Sorry, there is NO table available on this date and time!`);
    }

    const theObjToUpdate = await Reservation.findOneAndUpdate(
        { email: newReservation.email},
        { $push: { bookingTable:{
          numberOfPeople: newReservation.numberOfPeople,
          date: newReservation.date,
          joinStatus: newReservation.joinStatus,
          totalNumberOfPeople:newReservation.numberOfPeople,
          desc: newReservation.desc
    }}});

    console.log(theObjToUpdate);
    console.log(`updateReservationByID ${JSON.stringify(theObjToUpdate)}`);
    return theObjToUpdate;
};
exports.addReservation = addReservation;





const updateReservation = async (theID, theReservInfoObj) => {

    // same date and time but diffrent number of people
    // different date/time/number of people - done
    //---------------------------------------

//---------------------------TODO------------------------------------------
    // const theObjToUpdateJoining = await Reservation.updateMany(
    // {"joiningTable.idOfTheTableJoiningIt": theID}, 
    // {"$set":{
    //     "joiningTable.$.totalNumberOfPeople": Number(theReservInfoObj.totalNumberOfPeople) - Number(theReservInfoObj.numberOfPeople)
    // }});

    // let sum = 0;
    // const reservationWithSpecificId = await Reservation.find({
    //     "bookingTable": {
    //         "$elemMatch":{
    //             _id: theID,
    //         }}
    // })
    
    // reservationWithSpecificId.forEach(i => {   
    //     i.bookingTable.forEach(i => {
    //         sum = Number(i.totalNumberOfPeople);
    //     })
    // })

    const updateBookingRes = await Reservation.updateOne({"bookingTable._id":theID},
    {"$set":{
        "bookingTable.$.numberOfPeople":theReservInfoObj.numberOfPeople, 
        "bookingTable.$.date":theReservInfoObj.date,
        "bookingTable.$.joinStatus":theReservInfoObj.joinStatus,   
        "bookingTable.$.totalNumberOfPeople":theReservInfoObj.numberOfPeople, 
        "bookingTable.$.desc":theReservInfoObj.desc  }}
    )

    // if(updateBookingRes.matchedCount === 1){

    //     let sum = Number(theReservInfoObj.numberOfPeople);
    //     const updateTotalNum = await Reservation.find({
    //         "joiningTable": {
    //             "$elemMatch":{
    //               idOfTheTableJoiningIt: theReservInfoObj._id,
    //             }}
    //     })

    //     updateTotalNum.forEach(x => {   
    //         x.joiningTable.forEach(j => {
    //             sum += Number(j.numberOfPeople);
    //         })
    //     })

    //     if(sum > 8) return "It's limited for 8 people in a table!";


    // }
    const updateJoiningRes = await Reservation.updateOne({"joiningTable._id":theID},
    {"$set":{
        "joiningTable.$.numberOfPeople":theReservInfoObj.numberOfPeople, 
        "joiningTable.$.date":theReservInfoObj.date,
        "joiningTable.$.joinStatus":theReservInfoObj.joinStatus,   
        "joiningTable.$.totalNumberOfPeople":theReservInfoObj.numberOfPeople, 
        "joiningTable.$.desc":theReservInfoObj.desc  }}
    )
}
exports.updateReservation = updateReservation;



//--------------------------------------
// delete reservation by id
const deleteReservationById = async (reservationId) => {

    const x = await Reservation.update(
        { },
        {"$pull":
            {"bookingTable":{"_id": ObjectId(reservationId)},
            "joiningTable":{"_id": ObjectId(reservationId)}
    }});

    // const x = await Reservation.deleteOne({ "bookingTable._id": ObjectId(reservationId)});
    // console.log(`deleteReservationById ${JSON.stringify(x)}`);
    return x.deletedCount;
};
exports.deleteReservationById = deleteReservationById;




















// //--------------------------------------
// // Update info of a reservation by its id
// const updateReservation = async (theID, theReservInfoObj) => {
// console.log(theReservInfoObj);
//     const theObjToUpdate = await Reservation.findOneAndUpdate(
//         {
//             email: theReservInfoObj.email,
//             "bookingTable": {
//                "$elemMatch":{
//                  _id: ObjectId(theID),
//                 //  joinStatus:false
//                }}
//            },
//            { 
//             "$set":{
//               numberOfPeople:theReservInfoObj.numberOfPeople,
//               date: theReservInfoObj.date,
//               joinStatus: theReservInfoObj.joinStatus,
//               totalNumberOfPeople:theReservInfoObj.numberOfPeople,
//               desc: theReservInfoObj.desc

//         }});
    
//     // const theObjToUpdate = await Reservation.updateOne({ _id: theID }, theReservInfoObj);
//     // console.log(`updateReservationByID ${JSON.stringify(theObjToUpdate)}`);
//     // return theObjToUpdate.modifiedCount;
// };
// exports.updateReservation = updateReservation;


// //--------------------------------------
// // delete reservation by id
// const deleteReservationById = async (reservationId) => {

//     const x = await Reservation.deleteOne({ _id: reservationId });
//     console.log(`deleteReservationById ${JSON.stringify(x)}`);
//     return x.deletedCount;
// };
// exports.deleteReservationById = deleteReservationById;




