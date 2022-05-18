import { useState, useEffect } from 'react';
import axios  from 'axios';
import './BackupReservations.css'

export  function BackupHelp() {

    const theLoggedInUser = JSON.parse(localStorage.getItem("user")|| '{}') ;

    const url = `http://localhost:3333/api/reservations/${theLoggedInUser.email}`;
    const [bookingRes,setBookingRes] = useState([]);
    const [joiningRes,setJoiningRes] = useState([]);
    const [ordersRes,setOrdersRes] = useState([]);

    useEffect(()=>{
        axios.get(url)
        .then(response=>{
            console.log(response.data);
            setBookingRes(response.data.bookingTable);
            setJoiningRes(response.data.joiningTable);
            setOrdersRes(response.data.orders);
        })
    },[]);


  return( 
  <div className="BackupHelp">
        <div>
            <h2>Booking</h2>
            {bookingRes.map((curr,i)=>{
                return <Card key={i} setRes={setBookingRes} {...curr}></Card>;
            })}
        </div>
        <div>
            <h2>Joining</h2>
            {joiningRes.map((curr,i)=>{
                return <Card key={i} setRes={setJoiningRes} {...curr}></Card>;
            })}
        </div>
        <div>
            <h2>Orders</h2>
            {ordersRes.map((curr,i)=>{
                return <Order key={i} setRes={setOrdersRes} {...curr}></Order>;
            })}
        </div>
  </div>
  );
}


interface interfaceOrdersObj { 
    _id: string;
    orderDate: Date;
    totalPrice: number;
    orderStatus:boolean;   
}

const Order = (props:{_id:string,orderDate:Date,totalPrice:number,orderStatus:boolean, setRes:Function})=>{


    const [orderFormInfo,setOrderFormInfo] = useState<interfaceOrdersObj>({
        _id: props._id,
        orderDate: props.orderDate,
        totalPrice: props.totalPrice,
        orderStatus:props.orderStatus,   
    });

    useEffect(()=>{
        setOrderFormInfo({
            _id: props._id,
            orderDate: props.orderDate,
            totalPrice: props.totalPrice,
            orderStatus:props.orderStatus, 
        })
    },[]);

    function setOrderDateFormate(){
        let date = new Date(orderFormInfo.orderDate);
    
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();
    
        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;
    
        return [ day, month, year].join('/');
    }

    function setOrderTimeFormate(){
        let date = new Date(orderFormInfo.orderDate);

        let hours = '' + (date.getHours());
        let seconds = '' + (date.getMinutes());
        
        if (seconds.length < 2)
          seconds =  '0' + seconds;
        
        return [hours, seconds].join(':');
    }

    return (
        <div className='divAroundCards'>
            <div className='divAroundOrderID'>
                <label className="lbl">Order ID: </label>
                <input type="text" value={orderFormInfo._id } id="orderID" name="orderID" disabled autoComplete="off" placeholder="" />
            </div>
            <div className='divAroundOrderID'>
                <label className="lbl">Order Date: </label>
                <input type="text" value={setOrderDateFormate()} id="orderDate" name="orderDate" disabled autoComplete="off" placeholder=""/>
            </div>
            <div className='divAroundOrderID'>
                <label className="lbl">Order Time: </label>
                <input type="text" value={setOrderTimeFormate()} id="orderDate" name="orderDate" disabled autoComplete="off" placeholder=""/>
            </div>
            <div className='divAroundOrderID'>
                <label className="lbl">Total Price: </label>
                <input type="text" value={orderFormInfo.totalPrice +"$"} id="totalPrice" name="totalPrice" disabled autoComplete="off" placeholder=""/>
            </div>
            <div className='divAroundOrderID'>
                <label className="lbl">Order Status: </label>
                <input type="text" value={orderFormInfo.orderStatus.toString()} id="orderStatus" name="orderStatus" disabled autoComplete="off" placeholder=""/>
            </div>      
     </div>
)}
 

interface interfaceObject { 
    _id: string;
    numberOfPeople: number;
    date: Date;
    totalNumberOfPeople:number;
    joinStatus:boolean;
}

const Card = (props:{_id:string,numberOfPeople:number,dateT:string, hour:string, date:Date,totalNumberOfPeople:number, joinStatus:boolean,desc:string, setRes:Function})=>{
    
    const [changeResFormInfo,setChangeResFormInfo] = useState<interfaceObject>({
        _id: props._id,
        numberOfPeople: props.numberOfPeople,
        date: props.date,
        totalNumberOfPeople:props.totalNumberOfPeople,
        joinStatus:props.joinStatus
    });

    useEffect(()=>{
        setChangeResFormInfo({
            _id: props._id,
            numberOfPeople: props.numberOfPeople,
            date: props.date,
            totalNumberOfPeople:props.totalNumberOfPeople,
            joinStatus:props.joinStatus
        })
    },[]);
    
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

    function setDateFormate(){
        let date = new Date(changeResFormInfo.date);
      
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();
    
        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;
    
        return [year, month, day].join('-');
    }

    function setTimeFormate(){
        let date = new Date(changeResFormInfo.date);

        let hours = '' + (date.getHours());
        let seconds = '' + (date.getMinutes());
        
        if (seconds.length < 2)
          seconds =  '0' + seconds;
        
        return [hours, seconds].join(':');
    }

    function handdlingChangedButton() {

        let newObj :any = {
            ...changeResFormInfo
        };

        let dateTime = new Date( `${newObj.dateT} ${newObj.hour}`);
        newObj.date = dateTime;
        console.log(newObj);

        if(props.joinStatus === true){
            alert("To update the reservation, call +01 234 567 890"); 
        }
        else{
            axios.put(`http://localhost:3333/api/reservations/change/${props._id}`,newObj)
            .then(res=>{
                console.log(res.data);
                alert("The reservation has been successfully updated.");
            })
            .catch(error=>{
                console.log(error); 
            });
        }
    }

    function handdlingDeleteButton() {

        // if(props.joinStatus === true){
        //     alert("To delete the reservation, call +01 234 567 890"); 
        // }

        // else{
        //     axios.delete(`http://localhost:3333/api/reservations/${props._id}`)
        //     .then(res=>{
        //         console.log(res);
        //         console.log(res.data); 
        //         alert("The reservation has been deleted!"); 
        //     })
        //     .catch(error=>{
        //         console.log(error); 
        //     });
        // }  

        axios.delete(`http://localhost:3333/api/reservations/${props._id}`)
        .then(res=>{
            console.log(res);
            console.log(res.data); 
            alert("The reservation has been deleted!"); 
        })
        .catch(error=>{
            console.log(error); 
        });
    }

    return (
        <div className='divAroundCards'>
            <div className='divAroundReservationID'>
                <label className="lbl">ReservationID: </label>
                <input onChange={(e)=>textWasChanged(e, "_id")}
                type="text" value={changeResFormInfo._id } id="reservationID" name="reservationID" disabled autoComplete="off" placeholder="" />
            </div>
            <div className='divAroundNumOfPeople'>
                <label className="lbl">Number of people: </label>
                <input onChange={(e)=>textWasChanged(e, "numberOfPeople")}
                type="text" value={changeResFormInfo.numberOfPeople } id="numOfPeople" name="numOfPeople" required autoComplete="off" placeholder=""/>
            </div>
            <div className="divAroundReservationDate">
                <label className="lbl">Date: </label>
                <input onChange={(e)=>textWasChanged(e, "dateT")}
                    type="date" value={setDateFormate()} id="theDate" name="theDate" min="2022-01-01" max="2023-01-01"/>
            </div> 
            {/* <div className="divAroundReservationDate">
                <label className="lbl">Hour: </label>
                <input onChange={(e)=>textWasChanged(e, "date")}
                    type="time"  id="theDate" name="theDate" min="2022-01-01" max="2023-01-01"/>
            </div>  */}
            <div className='divAroundReservationHour'>
                <label className="lbl">Hour: </label>
                <select name="reservationDate" id="reservationDate" defaultValue={setTimeFormate()} value={setTimeFormate()} onChange={(e)=>textWasChanged(e,"hour")}>
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
            <div className='divAroundJoinStatus'>
                <label className="lbl">Join status: </label>
                <input
                type="text" value={changeResFormInfo.joinStatus.toString() } id="joinStatus" name="JoinStatus" disabled autoComplete="off" placeholder="" />
            </div>
            <div className='divAroundTotalNum'>
                <label className="lbl">Total number of people: </label>
                <input
                type="text" value={changeResFormInfo.totalNumberOfPeople} id="totalNum" name="totalNum" disabled autoComplete="off" placeholder= ""/>
            </div>
            <div className='divAroundButtons'>
                <button onClick={()=>handdlingDeleteButton()} >Delete</button>
                <button onClick={()=>handdlingChangedButton()}>Update</button>
            </div>  
        </div>
    )
}


