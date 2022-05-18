import axios from 'axios';
import { useEffect, useState,useContext } from 'react';
import './CartIcon.css'
import {CartContext} from '../contextAPI/CartContext';

function ItemsCard(props:{curr:any, setCartTotal:Function}){
  const [quantityNum,setQuantityNum] = useState(0);
  const [,setCart] = useContext(CartContext);

  const MinusButton=()=>{
    if(quantityNum === 0){
      return;
    }
    else{
      // setQuantityNum(quantityNum-1);
      props.setCartTotal((total:number) => total - props.curr.price)
      setQuantityNum(quantityNum-1);
    }
  }

  const PlusButton=()=>{
    props.setCartTotal((total:number) => total + props.curr.price)
    return setQuantityNum(quantityNum+1);
  }

  const DeleteButton=(_id:string)=>{
    const items = JSON.parse(localStorage.getItem("cart") || '{}');
    const newItems= items.filter((item:string) => item !== _id);
    setCart(newItems);
    props.setCartTotal((total:number) => total - (props.curr.price*quantityNum))
  }

  return (
    <div className='listCard'>
      <div key={props.curr._id} className='cart-items'>
          <img src={props.curr.img} alt="" />
          <h2 className='itemTitle'> {props.curr.title}</h2>
          <h3 className='price'>{props.curr.price+"$"}</h3>
          <h3>{props.curr.desc}</h3>
          {/* <h3>{"Category: "+curr.category}</h3> */}
          <h3>{"Quantity: "}
            {<button onClick={()=>{MinusButton()}}>-</button>}
            { <input type="text" value={quantityNum} /> }
            {<button onClick={()=>PlusButton()}>+</button>}
          </h3>
          <h3>{"Total: "+ (quantityNum* props.curr.price+"$")}</h3>
          <button className='deleteBtn' onClick={()=>DeleteButton(props.curr._id)} >Delete</button>
        </div>
    </div>
  )
}

export function HelpCartIcon() {

    const [cart,] = useContext(CartContext);

    // localStorage.setItem("cart",JSON.stringify(cart));
    // const theIdItems = localStorage.getItem("cart") ;
    // console.log("asdfghjhgfdsdfghgfdsdfgh",theIdItems);
    // const theIdItemsResult = JSON.parse(theIdItems || '{}')


    const [orderItems,setOrderItems] = useState([{_id:"",title:"",category:"",price:0, img:"",desc:""}]);
    const theLoggedInUser = JSON.parse(localStorage.getItem("user")|| '{}') ;
    const [cartTotal, setCartTotal] = useState(0);
    
   
    useEffect(()=>{
        axios.get(`http://localhost:3333/api/cartItems/585`)
        .then(response=>{
            console.log(response.data);
            const idItems:any =[];
            cart.map((id:string) => {
              return idItems.push(response.data.find((item:any)=>item._id === id))
            })
            setOrderItems(idItems);
        })  
    },[cart]);



    function handdlingPayButton(){

      let newObj :any = {
        email:theLoggedInUser.email,
        totalPrice:cartTotal,
        orderDate: new Date(),
        orderStatus:true,
    };

    axios.post(`http://localhost:3333/api/cartItems/addOrder`,newObj)
    .then(res=>{
        console.log(res.data);
        // alert(res.data);
        alert("The order has been saved!"+
        "You can pay at pick-up time, or by calling this number: +01 234 567 890");
    })
    .catch(error=>{
        console.log(error); 
    });

    localStorage.removeItem("cart");
    }
  
    
    
  return (
    <div className='cart-icon'>
        {orderItems.map((curr,i)=>(
          <ItemsCard curr={curr} setCartTotal={setCartTotal}/>  
      ))}
      
      <h3>Cart Total: {cartTotal+"$"}</h3>
      <div>
      <button className='payBtn' onClick={()=>handdlingPayButton()}>Pay</button>
      </div>
    </div>
  )
}
