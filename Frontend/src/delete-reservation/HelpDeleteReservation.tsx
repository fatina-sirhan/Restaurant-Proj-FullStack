import './DeleteReservation.css'
import { useState } from 'react';
import axios from 'axios';


export function HelpDeleteReservation() {

    let [deleteResFormInfo, setDeleteResFormInfo] = useState(
        {
            id: ""
        }
    )

    function textWasChanged(
        e: React.ChangeEvent<HTMLInputElement>,
        whichField: string) {

        let newObj = {
            ...deleteResFormInfo,
            ...{
                [whichField]: e.target.value
            }
        };

        setDeleteResFormInfo(newObj);
        console.log(deleteResFormInfo);
    }

    const formWasSubmitted =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(deleteResFormInfo);
    
        axios.delete(`http://localhost:3333/api/reservations/${deleteResFormInfo.id}`)
        .then(res=>{
            console.log(res);
            console.log(res.data); 
            alert(res.data); 
        });
    }


  return(
    <div className='deleteReservationsPage'>
        <h1 className='h1DeleteReservations'>Delete a Reservation</h1>     
        <form  id= "deleteForm" onSubmit={(e)=>{ formWasSubmitted(e)}} >      
            <div >
                <label className="DRLbl">Enter the ID sent to you to delete the reservation:</label>
                <div id="divAroundID">
                    <input onChange={(e)=>textWasChanged(e, "id")}
                    type="text" id="idField" name="idField" placeholder="Enter the id here.. " />
                </div> 
            </div>
            <input type="submit" value={"Delete"} />
        </form>
    </div>
  )
}
