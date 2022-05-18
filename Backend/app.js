var express = require('express');

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


const signupRoutes =require('./routes/signup-api-routes');
app.use('/api/signup', signupRoutes);

const loginRoutes =require('./routes/login-api-routes');
app.use('/api/login', loginRoutes);

const reservationsRoutes =require('./routes/reservations-api-routes');
app.use('/api/reservations', reservationsRoutes);

const contactUsRoutes =require('./routes/contactUs-api-routes');
app.use('/api/contactUs', contactUsRoutes);

const menuItemsRoutes =require('./routes/menuItems-api-routes');
app.use('/api/menuItems', menuItemsRoutes);

const cartItemsRoutes =require('./routes/cartItems-api-routes');
app.use('/api/cartItems', cartItemsRoutes);




const server = app.listen(3333, "localhost", function () {
    var host = server.address().address
    var port = server.address().port


    // require('./DB/connectToMongoAtlas').example1();
    // const exmp1= require('./DB/connectToMongoAtlas').example1;
    // exmp1();

    console.log("My app is listening at http://%s:%s", host, port)
});