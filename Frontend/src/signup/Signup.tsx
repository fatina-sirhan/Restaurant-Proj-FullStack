import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css'

export function Signup() {
    const url = "http://localhost:3333/api/signup/new-signup";
    const navigate = useNavigate();

    let [signupInfo, setSignupInfo] = useState(
        {
            first: "",
            last: "",
            email: "",
            password: "",
            confirmPassword:"",
            role:"",
        }
    )

    function textWasChanged(
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
        whichField: string) {

        let newObj = {
            ...signupInfo,
            ...{
                [whichField]: e.target.value
            }
        };
        setSignupInfo(newObj);
    }

    function formWasSubmitted(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(signupInfo);
  
        axios.post(url,signupInfo)
        .then(res=>{
           console.log(res.data);
           if(res.data === "Added new user"){
            alert(res.data);
            navigate("/login");
           }
           else{
            alert(res.data);
           }
          
        })
        .catch(function(error){
            console.log(error);
        });
    }


  return (
    <div className="signupPage">
        <div id="divAroundHSignup">
                <h1 className='signupTitle'>Sign Up</h1>
            </div>
            <form  id= "signupForm" onSubmit={(e)=>{formWasSubmitted(e)}}>
                <div id="divAroundName">
                    <input onChange={(e)=>textWasChanged(e, "first")}
                        type="text" id="fname" name="fname" required autoComplete="off" placeholder="First name " />

                    <input onChange={(e) => { textWasChanged(e, "last") }}
                        type="text" id="lname" name="lname" required autoComplete="off" placeholder="Last name" />
                </div>

                <div id="divAroundEmail">
                    <input onChange={(e) => { textWasChanged(e, "email") }} 
                    type="text" id="Email" name="Email" required autoComplete="off" placeholder="Email Address" />
                </div>

                <div id="divAroundSignupPassword">
                    <input onChange={(e) => { textWasChanged(e, "password") }}  
                    type="password" id="SignupPassword" required  name="SignupPassword" placeholder="Password" />
                </div>

                <div id="divAroundPassword">
                    <input onChange={(e) => { textWasChanged(e, "confirmPassword") }}  
                    type="password" id="ConfirmPassword" required  name="ConfirmPassword" placeholder="Confirm Password" />
                </div>
            
                <input type="submit" value={"Sign Up"} />
            </form>
    </div>
  )
}
