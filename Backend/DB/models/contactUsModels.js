const mongoose = require('mongoose');


// Defining schema for "contact us" requests
const contactUsSchema = new mongoose.Schema({
    first: String,
    last: String,
    email: String,
    textareaStr:String
  });

  module.exports.ContactUs = mongoose.model('ContactUs', contactUsSchema);