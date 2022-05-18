const menuItemsModels = require('./models/menuItemsModels');
const MenuItems = menuItemsModels.MenuItems;



const getAllMenuItemsFromDB = async () => {
    const allMenuItems = await MenuItems.find();
    console.log(allMenuItems);
    console.log(`getAllMenuItems ${JSON.stringify(allMenuItems)}`);
    return JSON.parse(JSON.stringify(allMenuItems));
};
exports.getAllMenuItemsFromDB = getAllMenuItemsFromDB;
