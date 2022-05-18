const mongoose = require('mongoose');

//  Defining schema for a reservation
const menuItemsSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    img: String,
    desc: String,
});


module.exports.MenuItems = mongoose.model('MenuItems', menuItemsSchema, 'menuItems');
