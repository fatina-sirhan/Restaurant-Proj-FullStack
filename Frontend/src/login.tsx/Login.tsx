import axios from 'axios';
import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

export function Login(props:{isLogin:boolean,setIsLogin:React.Dispatch<React.SetStateAction<boolean>>, isAdmin:boolean,setIsAdmin:React.Dispatch<React.SetStateAction<boolean>>}) {
    // const url = `http://localhost:3333/api/login/${loginInfo.email}`;
    const navigate = useNavigate();

    let [loginInfo, setLoginInfo] = useState(
        {
            email: "",
            password: "",
        }
    )

    function textWasChanged(
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
        whichField: string) {

        let newObj = {
            ...loginInfo,
            ...{
                [whichField]: e.target.value
            }
        };
        setLoginInfo(newObj);
    }


    function formWasSubmitted(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();    
          
        axios.post(`http://localhost:3333/api/login/login`, loginInfo)
        .then(response=>{
            console.log(response.data);

            if(response.data ==="Error!! Password or email are incorrect"){
                alert(response.data);
                setLoginInfo(response.data);
            }
            else{
                alert("User logged in");
                props.setIsLogin(true);
                navigate("/home");
                setLoginInfo(response.data);

                localStorage.setItem('user',JSON.stringify(response.data));
                console.log(response.data);
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
    

  return (
    <div className='LoginPage'>
            <div id="divAroundHLogin">
                <h1 className='loginTitle'>Log Into Restaurant</h1>
            </div>
            <form  id= "loginForm" onSubmit={(e) => {formWasSubmitted(e)}}>
                <div >
                    <div id="divAroundName">
                        <input onChange={(e) => { textWasChanged(e, "email") }} type="text" id="LoginEmail" required name="LoginEmail"  placeholder="Email Address " />
                    </div>

                    <div id="divAroundPassword">
                        <input onChange={(e) => { textWasChanged(e, "password") }} type="password" id="LoginPassword" required name="LoginPassword" placeholder="Password" />
                    </div>
                </div>
                <input type="submit" value={"Log In"} />

                <div >
                <ul className='forgetPassword'>
                    <li><a href="forgetPassword">Forget password?</a></li>
                </ul>
                </div>

                <div className='underLine'> </div>
                <button  className="createBtn" onClick={() => navigate("/signup")}>Create new account</button>
            </form>
    </div>
  )
}
