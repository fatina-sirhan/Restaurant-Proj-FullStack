const signupModels = require('./models/signupModels');
const SignUp = signupModels.Signup;


// Add new user
const addNewUser = async (newUserRegisteration, password,confirmPassword) => {
    console.log("--", JSON.stringify(newUserRegisteration));

    newUserRegisteration.role = "user"; 


    if(password === confirmPassword){
        const newUserReg = new SignUp(newUserRegisteration);
        const x = await newUserReg.save();
        console.log(`addUser ${JSON.stringify(x)}`);
        return (`Added new user`); 
    }
    else{
        return("Passwords not match!!")
    }

};
exports.addNewUser = addNewUser;
