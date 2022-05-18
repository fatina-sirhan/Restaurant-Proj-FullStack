const contactUsModels = require('./models/contactUsModels');
const ContactRequest = contactUsModels.ContactUs;


// Add new contact request 
const addContactRequest = async (newContactRequest) => {
    console.log("--", JSON.stringify(newContactRequest));
    const newContactReq = new ContactRequest(newContactRequest);
    const x = await newContactReq.save();
    console.log(`addRequest ${JSON.stringify(x)}`);
    return (`Added new contact request`); 

};
exports.addContactRequest = addContactRequest;
