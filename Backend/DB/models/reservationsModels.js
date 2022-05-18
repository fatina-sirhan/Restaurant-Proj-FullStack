const mongoose = require('mongoose');

// var url = 'mongodb+srv://fatinasirhan:f12345@cluster0.qwlty.mongodb.net/restaurant?retryWrites=true&w=majority';
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//  .then(() => console.log('Connected successfully to MongoDB!'))
//  .catch(err => console.error('Something went wrong', err));


//  Defining schema for a reservation
const reservationSchema = new mongoose.Schema({
    numberOfPeople: Number,
    date: Date,
    joinStatus: Boolean,
});


module.exports.Reservation = mongoose.model('Reservation', reservationSchema);
