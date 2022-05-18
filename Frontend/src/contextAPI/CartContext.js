import {useState,useEffect, createContext } from "react"

export const CartContext = createContext();

export default function CartContextProvider(props) {

  const [cart,setCart] = useState([],()=>{
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });


  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart"))) { 
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    if(cart){
      localStorage.setItem("cart",JSON.stringify(cart));
    }
  }, [cart]);

  // const addItemsToCart=(id)=>{
  //   setCart(old => old.push(id));
  //   localStorage.setItem("cart",JSON.stringify(cart));
  // }

  // useEffect(()=>{
  //   if(localStorage.getItem("cart") === null){
  //     setCart([]);
  //   }
  //   else{
  //     setCart(JSON.parse(localStorage.getItem("cart")));
  //   }
  // },[])

  // useEffect(()=>{
  //   if(localStorage.getItem("cart") !== null){
  //     setCart(JSON.parse(localStorage.getItem("cart")));
  //   }
  //   else{
  //     setCart([]);
  //   }
 
  // },[addItemsToCart])

  return (
  <CartContext.Provider value={[cart,setCart]}>
    {props.children}
  </CartContext.Provider>
  )
}
