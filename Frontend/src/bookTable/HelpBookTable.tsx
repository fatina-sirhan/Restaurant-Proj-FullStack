import './BookTable.css'
import React, { useState } from "react";
import axios from 'axios';
import { FaQuestionCircle } from 'react-icons/fa';

// import { useNavigate } from 'react-router-dom';

export function HelpBookTable() {
 
    // const navigate = useNavigate();
    const url = "http://localhost:3333/api/reservations/new-reservation";
    const theLoggedInUser = JSON.parse(localStorage.getItem("user")|| '{}') ;
 
    let [reservationFormInfo, setReservationFormInfo] = useState(
        {
            email:theLoggedInUser.email,
            numberOfPeople: 0,
            dateT: "",
            hour: "",
            joinStatus: false,
            date: new Date(),
            desc:""
        }
    )
    
    let [availableTablesToJoin, setAvailableTablesToJoin] = useState(false)
  


    function fieldWasChanged(
        e:React.ChangeEvent<HTMLSelectElement> |React.ChangeEvent<HTMLInputElement>,
        whichField: string) {

        let newObj = {
            ...reservationFormInfo,
            ...{
                [whichField]: e.target.value
            }
        };
        setReservationFormInfo(newObj);
        console.log(reservationFormInfo);
    }
    
    const formWasSubmitted =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(reservationFormInfo);

        let newObj = {
            ...reservationFormInfo
        };

        let dateTime = new Date( `${newObj.dateT} ${newObj.hour}`);
        newObj.date = dateTime;
        console.log(newObj.numberOfPeople);

        axios.post(url,newObj)
        .then(res=>{
           console.log(res.data);
        //    alert(res.data);
            alert("The reservation has been added");
        })
        .catch(function(error){
            console.log(error);
        });
    }   

    const myFunction=()=>{
        var popup = document.getElementById("myPopup");
        if(popup != null) {
            popup.classList.toggle("show");
        }   
    }
    
    return (
        <div className='bookingTablePage'>
            <h1 className='h1BookingTable'>Make a Reservation</h1>
        
            <form className="bookingTableForm" onSubmit={(e)=>{formWasSubmitted(e)}}>
                <div className="peopleDateTime">
                    <div className="numOfPeople">
                        <select name="peopleSelect" id="peopleSelect" required defaultValue={'DEFAULT'} onChange={(e)=>fieldWasChanged(e, "numberOfPeople")}>
                            <option value="DEFAULT" disabled>Number of people</option>
                            <option value="1">1 person</option>
                            <option value="2">2 people</option>
                            <option value="3">3 people</option>
                            <option value="4">4 people</option>
                            <option value="5">5 people</option>
                            <option value="6">6 people</option>
                            <option value="7">7 people</option>
                            <option value="8">8 people</option>
                            <option value="9">9 people</option>
                            <option value="10">10 people</option>
                            <option value="11">11 people</option>
                            <option value="12">12 people</option>
                            <option value="13">13 people</option>
                            <option value="14">14 people</option>
                            <option value="15">15 people</option>
                            <option value="16">16 people</option>
                            <option value="17">17 people</option>
                            <option value="18">18 people</option>
                            <option value="19">19 people</option>
                            <option value="20">20 people</option>
                            <option value="21">Larger party</option>
                        </select>
                    </div>

                    <div className="dateOfReservation">
                        <input onChange={(e)=>fieldWasChanged(e, "dateT")}
                        type="date" id="theDate" name="theDate" required min="2022-01-01" max="2023-01-01"/>
                    </div> 

                    <div className="timeOfReservation">
                        <select name="timeSelect" id="timeSelect" required onChange={(e)=>fieldWasChanged(e, "hour")}>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="20:00">8:00 PM</option>
                            <option value="21:00">9:00 PM</option>
                            <option value="22:00">10:00 PM</option>
                            <option value="23:00">11:00 PM</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="">Do you want someone to join your table?</label>

                    <input type="checkbox" id='check' onChange={(e)=>{
                        let newObj = {
                            ...reservationFormInfo,
                            ...{
                                joinStatus: e.target.checked
                            }
                        };
                        setReservationFormInfo(newObj);
                        //-------------------------check------------------
                        // setAvailableTablesToJoin(true);
                        setAvailableTablesToJoin(!availableTablesToJoin);
                    }} />

                    
                    {/* <div className='popup' onClick={()=>myFunction()}> <FaQuestionCircle/>
                        <span className='popuptext' id="myPopup">A Simple Popup!</span>
                    </div> */}
                </div>

                <div className='submitDiv'>
                    {!availableTablesToJoin && 
                     <input type="submit" value={"Find a Table"} />
                    }
                </div>


                <div className='interests-bookTable'>
                {availableTablesToJoin && 
                <div>
                    <br />
                    <br />
                    <div>
                        <label  className="lbl">Add your hobbies and interests please: </label>
                        <div className='popup' onClick={()=>myFunction()}> <FaQuestionCircle/>
                        <span className='popuptext' id="myPopup">Example: 
                        Hello, my name is Mark, I'm 24 years old.
                        I like reading books and working out. Along with this, I also like cooking.
                        </span>
                    </div>
                    </div>
                    <br />
                    <textarea name="txtAreaMsg" onChange={(e)=>{
                            let newObj = {
                                ...reservationFormInfo,
                                ...{
                                    desc: e.target.value
                                }
                            };
                            setReservationFormInfo(newObj);
                        }} 
                        placeholder="Enter here..." id="txtAreaMsg" maxLength={150} cols={35} rows={5}></textarea>
                    <div className='submitDiv'>
                        <input type="submit" value={"Find a Table"} />
                    </div>
                </div>}
              </div>

            </form>
        </div>
    )
}
