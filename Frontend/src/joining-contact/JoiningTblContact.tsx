import axios from "axios";
import { useState } from "react";
import './JoiningTblContact.css'

export function JoiningTblContact() {

    const url = "http://localhost:3333/api/contactUs/new-joining-request";

    let [formInfo, setFormInfo] = useState(
        {
            first: "",
            last: "",
            email: "",
            phone:"",
            description: "",
            joinStatus: "false",
        }
    )

    function textWasChanged(
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
        whichField: string) {

        let newObj = {
            ...formInfo,
            ...{
                [whichField]: e.target.value
            }
        };
        setFormInfo(newObj);
    }

    function formWasSubmitted(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formInfo);
  
        axios.post(url,formInfo)
        .then(res=>{
           console.log(res.data);
           alert(res.data);
        })

        .catch(function(error){
            console.log(error);
        });
    }

  return (
    <div className="JoiningTblContactPage">
         <div id="divAroundH">
                <h1 className='contactTitle'>Add your details</h1>
            </div>
            <form  id= "contactForm" onSubmit={(e)=>{formWasSubmitted(e)}}>
                <div >
                    <label className="lbl">Enter your name:</label>
                    <div id="divAroundName">
                        <input onChange={(e)=>textWasChanged(e, "first")}
                         type="text" id="fname" name="fname" placeholder="First name " />

                        <input onChange={(e) => { textWasChanged(e, "last") }}
                         type="text" id="lname" name="lname" placeholder="Last name" />
                    </div>

                    <div id="divAroundEmail">
                        <label className="lbl">Email address:</label>
                        <input onChange={(e) => { textWasChanged(e, "email") }} 
                        type="text" id="Email" name="Email" placeholder="@gmail.com" />
                    </div>

                    <div id="divAroundPhone">
                        <label className="lbl">Phone number:</label>
                        <input onChange={(e) => { textWasChanged(e, "phone") }} 
                        type="text" id="Phone" name="Phone" placeholder="XXX-XXX-XXXX" />
                    </div>

                    <div id="divAroundTxtArea">
                        <label  className="lbl">Please add your interests </label>
                        <textarea name="txtAreaMsg" onChange={(e) => { textWasChanged(e, "description") }}
                         placeholder="Enter here..." id="txtAreaMsg" cols={50} rows={17}></textarea>
                    </div>
                </div>
                <input type="submit" value={"Confirm reservation"} />
            </form>
    </div>
  )
}
