import { HelpDeleteReservation } from './HelpDeleteReservation';

export function DeleteReservation() {

  return( 
    <div>
        <HelpDeleteReservation/>
    </div>
  )
}
























// import { HelpDeleteReservation } from "./HelpDeleteReservation";
// import axios from 'axios';
// import { useState } from 'react';
// import './DeleteReservation.css'

// export function DeleteReservation() {

//     let [deleteResFormInfo, setDeleteResFormInfo] = useState(
//         {
//             id: ""
//         }
//     )

//     function textWasChanged(
//         e: React.ChangeEvent<HTMLInputElement>,
//         whichField: string) {

//         let newObj = {
//             ...deleteResFormInfo,
//             ...{
//                 [whichField]: e.target.value
//             }
//         };

//         setDeleteResFormInfo(newObj);
//         console.log(deleteResFormInfo);
//     }

//     const formWasSubmitted =(e:React.FormEvent<HTMLFormElement>)=>{
//         e.preventDefault()
//         console.log(deleteResFormInfo);
    
//         axios.delete(`http://localhost:3333/api/reservations/${deleteResFormInfo.id}`)
//         .then(res=>{
//             console.log(res);
//             console.log(res.data); 
//             alert(res.data); 
//         });
//     }

//   return( 
//     <div className='deleteReservationsPage'>
//         <h1 className='h1Reservations'>Delete a Reservation</h1>     
//         <form  id= "contactForm" onSubmit={(e)=>{ formWasSubmitted(e)}} >      
//             <div >
//                 <label className="DRLbl">Enter the ID sent to you to delete the reservation:</label>
//                 <div id="divAroundID">
//                     <input onChange={(e)=>textWasChanged(e, "id")}
//                     type="text" id="idField" name="idField" placeholder="Enter the id here.. " />
//                 </div> 
//             </div>
//             <input type="submit" value={"Delete"} />
//         </form>
//     </div>
//   )
// }
