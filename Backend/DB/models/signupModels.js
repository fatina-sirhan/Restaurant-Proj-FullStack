const mongoose = require('mongoose');


var url = 'mongodb+srv://fatinasirhan:f12345@cluster0.qwlty.mongodb.net/restaurant?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected successfully to MongoDB!'))
 .catch(err => console.error('Something went wrong', err));


// Defining schema for "signup" requests
const signupSchema = new mongoose.Schema({
    role: String,
    first: String,
    last: String,
    email: String,
    password: String,
    confirmPassword:String,
    bookingTable :[{  
      numberOfPeople: Number,
      date: Date,
      joinStatus: Boolean,
      totalNumberOfPeople:Number,
      desc:String,
    }],
    joiningTable:[{
      userIdOfTheTableJoiningIt:String,
      idOfTheTableJoiningIt:String,
      numberOfPeople: Number,
      date: Date,
      joinStatus: Boolean,
      totalNumberOfPeople:Number
    }],
    orders:[{
      // orderAmount: Number,
      orderDate: Date, 
      totalPrice:Number,
      orderStatus:Boolean,
    }],
  });

module.exports.Signup = mongoose.model('Signup', signupSchema, 'users');