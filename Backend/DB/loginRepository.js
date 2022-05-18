const loginModels = require('./models/signupModels');
const LogIn = loginModels.Signup;


// Get user by email address
const findUserByEmail = async (userEmail) => {

    const x = await LogIn.findOne({email:  userEmail});
    console.log(`findUserByEmail ${JSON.stringify(x)}`);
    return x;
};
exports.findUserByEmail = findUserByEmail;



const checkLogin = async (userEmail, userPass) => {

    let isUserDetailsExistInDBAndCorrect = false;

    console.log('going to connect');

    try {
        const result = await LogIn.findOne({email:  userEmail});
        console.log(result);

        console.log(userPass);
        console.log(result.password);
        const x = (result.password=== userPass);
        console.log(x);
        if(result.password === userPass)
        {
            isUserDetailsExistInDBAndCorrect = true;
            return result;
        }
    } catch (err) {
        // ... error checks
        console.log(err);
    }
    return isUserDetailsExistInDBAndCorrect;
}
exports.checkLogin = checkLogin;
