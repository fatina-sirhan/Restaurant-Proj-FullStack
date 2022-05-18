import './Contact.css'
import { useState } from 'react';
// import $ from 'jquery';
import axios from 'axios';

export function Contact() {

    const url = "http://localhost:3333/api/contactUs/new-request";

    let [formInfo, setFormInfo] = useState(
        {
            first: "",
            last: "",
            email: "",
            textareaStr: "",
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

        // let queryParamsStr = `https://cyberfighters.herokuapp.com/qa-exercises/new-customer-registers/?`;

        // let isFirst = true;

        // for (const [k, v] of Object.entries(formInfo)) {
        //     if (isFirst === false) {
        //         queryParamsStr += `&${k}=${v}`
        //     }
        //     else {
        //         isFirst = false;
        //         queryParamsStr += `${k}=${v}`
        //     }
        // }

        // console.log(queryParamsStr);

        // $.ajax({
        //     url: queryParamsStr,
        //     success: function (result: string) {
        //         console.log(result);
        //     }
        // });
    }


    return (
        <div className='ContactUsPage' >
            <div id="divAroundH">
                <h1 className='contactTitle'>Have a question?</h1>
                <h2 className='contactUsIntroTitle'>EMAIL US</h2>
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

                    <div id="divAroundTxtArea">
                        <label  className="lbl">How can we help you? </label>
                        <textarea name="txtAreaMsg" onChange={(e) => { textWasChanged(e, "textareaStr") }}
                         placeholder="Enter message..." id="txtAreaMsg" cols={50} rows={17}></textarea>
                    </div>
                </div>
                <input type="submit" value={"submit"} />
            </form>
        </div>
    )
}
