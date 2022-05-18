import axios from 'axios';
import { useEffect, useState } from 'react';
import './Menu.css'


export function Menu() {

  const url = 'http://localhost:3333/api/menuItems/';
  const [menuItems,setMenuItems] = useState([{_id:"",title:"",category:"",price:0, img:"",desc:""}]);
  const [tempMenuItems,setTempMenuItems] = useState([{_id:"",title:"",category:"",price:0, img:"",desc:""}]);
  
  useEffect(()=>{
      axios.get(url)
      .then(response=>{
          console.log(response.data);
          setMenuItems(response.data);
          setTempMenuItems(response.data);
      })
  },[]);

  const handleAllBtn = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTempMenuItems(menuItems);
  };

  const handleBreakfastBtn = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let breakfastTemp= menuItems.filter(menuItems => menuItems.category === "breakfast");
    setTempMenuItems(breakfastTemp);
  };

  const handleLunchBtn = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let lunchTemp= menuItems.filter(menuItems => menuItems.category === "lunch");
    setTempMenuItems(lunchTemp);
  };

  const handleShakesBtn = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let shakesTemp= menuItems.filter(menuItems => menuItems.category === "shakes");
    setTempMenuItems(shakesTemp);
  };


  return (
    <div className='menuList'>
      <div className='title'>
        <h2>Menu List</h2>
        <div className='underLine'> </div>
      </div>

      <div className='menu-tabs'>
        <button onClick={(e)=>{handleAllBtn(e)}} type='button' className='menu-tab-item active' id='#all'>All</button>
        <button onClick={(e)=>{handleBreakfastBtn(e)}} type='button' className='menu-tab-item ' id='#breakfast'>Breakfast</button>
        <button onClick={(e)=>{handleLunchBtn(e)}} type='button' className='menu-tab-item' id='#lunch'>Lunch</button>
        <button onClick={(e)=>{handleShakesBtn(e)}} type='button' className='menu-tab-item' id='#shakes'>Shakes</button>
      </div>

      {tempMenuItems.map((curr,i)=>(
        <div key={curr._id} className='list'>
          <img src={curr.img} alt="" />
          <h2 className='itemTitle'> {curr.title}</h2>
          <h3 className='price'>{curr.price+"$"}</h3>
          <h3>{curr.category}</h3>
          <h3>{curr.desc}</h3>
        </div> 
      ))}
    </div>
  )
}


