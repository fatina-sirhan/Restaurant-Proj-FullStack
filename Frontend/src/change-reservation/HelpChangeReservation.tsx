import './ChangeReservation.css'
import { useState } from 'react';
import axios from 'axios';


export function HelpChangeReservation() {

    const theLoggedInUser = JSON.parse(localStorage.getItem("user")|| '{}') ;
 
    let [changeResFormInfo, setChangeResFormInfo] = useState(
        {
            id:"",
            email:theLoggedInUser.email,
            numberOfPeople: 0,
            dateT: "",
            hour: "",
            joinStatus: false,
            date: new Date(),
            desc:""
        })

    let [availableTablesToJoin, setAvailableTablesToJoin] = useState(false)
  

    
    function textWasChanged(
        e: React.ChangeEvent<HTMLInputElement> |React.ChangeEvent<HTMLSelectElement>,
        whichField: string) {
    
        let newObj = {
            ...changeResFormInfo,
            ...{
                [whichField]: e.target.value
            }
        };
        setChangeResFormInfo(newObj);
        console.log(changeResFormInfo);
    }
    
    
    const formWasSubmitted =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(changeResFormInfo);

        let newObj = {
            ...changeResFormInfo
        };

        let dateTime = new Date( `${newObj.dateT} ${newObj.hour}`);
        newObj.date = dateTime;
        console.log(newObj.numberOfPeople);
        console.log(newObj.date);

        axios.put(`http://localhost:3333/api/reservations/change/${changeResFormInfo.id}`,newObj)
        .then(res=>{
            console.log(res.data);
            alert(res.data);
        });
    }   


    return( 
        <div className='changeReservationsPage'>
        <h1 className='h1ChangeReservations'>Change a Reservation</h1>   
        <div id="divAroundID">
            <label className="ChRLbl">Reservation ID: </label>
            <input onChange={(e)=>textWasChanged(e, "id")}
            type="text" id="idField" name="idField" placeholder="Enter the id here.. " />
        </div>   
            <form className="changeReservationForm" onSubmit={(e)=>{formWasSubmitted(e)}}>
                <div className="peopleDateTime">
                    <div className="numOfPeople">
                        <select name="peopleSelect" id="peopleSelect" defaultValue={'DEFAULT'} onChange={(e)=>textWasChanged(e, "numberOfPeople")}>
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
                        <input onChange={(e)=>textWasChanged(e, "dateT")}
                        type="date" id="theDate" name="theDate" min="2022-01-01" max="2023-01-01"/>
                    </div> 

                    <div className="timeOfReservation">
                        <select name="timeSelect" id="timeSelect" onChange={(e)=>textWasChanged(e,"hour")}>
                            <option value="00:00">12:00 AM</option>
                            <option value="00:30">12:30 AM</option>
                            <option value="01:00">1:00 AM</option>
                            <option value="01:30">1:30 AM</option>
                            <option value="02:00">2:00 AM</option>
                            <option value="02:30">2:30 AM</option>
                            <option value="03:00">3:00 AM</option>
                            <option value="03:30">3:30 AM</option>
                            <option value="04:00">4:00 AM</option>
                            <option value="04:30">4:30 AM</option>
                            <option value="05:00">5:00 AM</option>
                            <option value="05:30">5:30 AM</option>
                            <option value="06:00">6:00 AM</option>
                            <option value="06:30">6:30 AM</option>
                            <option value="07:00">7:00 AM</option>
                            <option value="07:30">7:30 AM</option>
                            <option value="08:00">8:00 AM</option>
                            <option value="08:30">8:30 AM</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="09:30">9:30 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="10:30">10:30 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="11:30">11:30 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="12:30">12:30 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="13:30">1:30 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="14:30">2:30 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="15:30">3:30 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="16:30">4:30 PM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="17:30">5:30 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="18:30">6:30 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="19:30">7:30 PM</option>
                            <option value="20:00">8:00 PM</option>
                            <option value="20:30">8:30 PM</option>
                            <option value="21:00">9:00 PM</option>
                            <option value="21:30">9:30 PM</option>
                            <option value="22:00">10:00 PM</option>
                            <option value="22:30">10:30 PM</option>
                            <option value="23:00">11:00 PM</option>
                            <option value="23:30">11:30 PM</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="">Do you want someone to join your table?</label>
                    <input type="checkbox" onChange={(e)=>{
                        let newObj = {
                            ...changeResFormInfo,
                            ...{
                                joinStatus: e.target.checked
                            }
                        };
                        setChangeResFormInfo(newObj);
                        //-------------------------check------------------
                        setAvailableTablesToJoin(true);
                    }} />
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
                    </div>
                    <br />
                    <textarea name="txtAreaMsg" onChange={(e)=>{
                            let newObj = {
                                ...changeResFormInfo,
                                ...{
                                    desc: e.target.value
                                }
                            };
                            setChangeResFormInfo(newObj);
                        }} 
                        placeholder="Enter here..." id="txtAreaMsg" cols={35} rows={5}></textarea>
                    <div className='submitDiv'>
                        <input type="submit" value={"Find a Table"} />
                    </div>
                </div>}
              </div>

            </form>
        </div>
    )
}
