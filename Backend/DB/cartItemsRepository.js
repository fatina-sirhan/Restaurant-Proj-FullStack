const req = require('express/lib/request');
const cartItemsModels = require('./models/signupModels');
const CartItems = cartItemsModels.Signup;

const menuItemsModels = require('./models/menuItemsModels');
const MenuItems = menuItemsModels.MenuItems;


var ObjectId = require('mongodb').ObjectID;

//--------------------------------------
// Get all reservations
const getAllMenuItemsFromDB = async () => {

    // const allMenuItems = await CartItems.find();
    // console.log(`getAllMenuItems ${JSON.stringify(allMenuItems)}`);
    // return JSON.parse(JSON.stringify(allMenuItems));

};
exports.getAllMenuItemsFromDB = getAllMenuItemsFromDB;

//--------------------------------------
// Get info of a reservation by its id 
const findMenuItemById = async (userEmail) => {


    console.log("the arrayyyy",userEmail);
    let arr = [];

    // const allOrderItems ="";

    // const temp = userEmail[0];

    // console.log("tempppppp",temp);
    let allOrderItems = await MenuItems.find();


    // for (let i = 0; i < userEmail.length; i++) {
     
    //      allOrderItems = await MenuItems.findOne({
    //             _id: ObjectId(userEmail[i]),
    //     });
    //     arr.push(allOrderItems);
    // }

    // let allOrderItems = await MenuItems.find({
    //     _id: ObjectId(temp),
    // });

    // allOrderItems.map(u => {
    // key={u};
    // let filterd = u.orders.filter((b) => {
    //     return b;
    // });
    // filterd.map(f => {
    //     key={f};
    //     arr.push({_id:f._id,title: f.title, category:f.category, price:f.price,img:f.img, desc:f.desc});
    //        }) 
    // });

    // console.log("tempppp",temp);
    console.log("finalllllllllll",allOrderItems);
    return allOrderItems;
};
exports.findMenuItemById = findMenuItemById;


//--------------------------------------
// Add new item to order array
const addItemToTheCart = async (newItemToAdd) => {

    const theObjToUpdate = await CartItems.findOneAndUpdate(
        { email: newItemToAdd.email},
        { $push: { orders:{
        orderDate: newItemToAdd.orderDate,
        totalPrice: newItemToAdd.totalPrice,
        orderStatus: newItemToAdd.orderStatus,
    }}});

    console.log(theObjToUpdate);
    console.log(`updateReservationByID ${JSON.stringify(theObjToUpdate)}`);
    return theObjToUpdate;
}
exports.addItemToTheCart=addItemToTheCart;





//--------------------------------------
// delete item from cart by id
const deleteCartItemById = async (carItemId) => {

    const x = await CartItems.update(
        { },
        {"$pull":
            {"orders":{"_id": carItemId},
    }});
    
    return x.deletedCount;
};
exports.deleteCartItemById = deleteCartItemById;