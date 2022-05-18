import axios from 'axios';
import { useState } from 'react';
import './JoinTable.css'

export function HelpJoinTable() {

  const url1 = "http://localhost:3333/api/reservations/check-join-table";
  const url2 = "http://localhost:3333/api/reservations/add-join-table";
  const theLoggedInUser = JSON.parse(localStorage.getItem("user")|| '{}') ;

  let [reservationFormInfo, setReservationFormInfo] = useState(
      {
          email:theLoggedInUser.email,
          numberOfPeople: 0,
          dateT: "",
          hour: "",
          joinStatus: true,
          date: new Date(),
      }
  )

  let [availableTablesToJoin, setAvailableTablesToJoin] = useState([])
  

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
      setReservationFormInfo(newObj);

      axios.post(url1,newObj)
      .then(res=>{
         console.log(res.data);

         console.log((res.data).length);
        if((res.data).length === 0){
          alert("Unfortunately, there is NO available table to join"); 
        }
        else{
          setAvailableTablesToJoin(res.data);  
        } 
      })
      .catch(function(error){
          console.log(error);
      });
  }


  const joinATable= (user:string, book:string ,numberOfPeople:number,totalNumberOfPeople:number, desc:string)=>{

  let theNewObj = {
    ...reservationFormInfo,
    ...{
      userIdOfTheTableJoiningIt: user,
      idOfTheTableJoiningIt:book,
      numPplOfTheTableJoiningIt: numberOfPeople,
      totalNumberOfPeopleInBookingTable: totalNumberOfPeople,
      desc:desc
    }
  };
  
  axios.post(url2,theNewObj)
    .then(res=>{
      console.log(res.data);
      // alert(res.data);
      alert("The reservation has been added");
    })
    .catch(function(error){
        console.log(error);
    });

    axios.put(`http://localhost:3333/api/reservations/${theNewObj.userIdOfTheTableJoiningIt}`,theNewObj)
    .then(res=>{
      console.log(res.data);
      // alert(res.data);
    })
    .catch(function(error){
        console.log(error);
    });  
  }


  return (
    <div className="joinTablePage">
      <h1 className='h1BookingTable'>Join a Table</h1> 
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

                <div className='submitDiv'>
                   <input type="submit" value={"Find a Table"} />
                </div>
            </form>
            <br />
            <br />
            <div className='table-joinTable'>
              {availableTablesToJoin.length > 0 && <table>
                <thead>
                  <tr className='thTableColumns'>
                    <th>Name  </th>
                    <th>Date  </th>
                    <th>Left Places  </th>
                    <th>Interests </th>
                    <th>  </th>
                  </tr>
                </thead>
                <tbody>
                  {availableTablesToJoin.map((x:any) => {
                    return(
                      <tr key={x._id}>
                        <td>{x.name}</td>
                        <td>{x.date}</td>
                        <td>{8-(x.totalNumberOfPeople)}</td>
                        <td>{x.desc}</td>
                        <td></td>
                        <td><button onClick={()=>{
                          joinATable(x.user,x.book,x.numberOfPeople,x.totalNumberOfPeople,x.desc)
                        }}>Join</button></td>
                      </tr>
                    )
                  })}
                </tbody>
                </table>}
              </div>
    </div>
  )
}
