import './Navbar.css'
import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function Navbar(props:{navItems:{title: string, url:string}[],isLogin: boolean,isAdmin:boolean ,logoImg:string}) {
    const [isLoginI, setIsLoginI] = useState<boolean>(props.isLogin);
    // const [isAdminI, setIsAdminI] = useState<boolean>(props.isAdmin);
    useEffect(()=>{setIsLoginI(props.isLogin)},[props.isLogin])
   

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        setIsLoginI(false);
      };


    return (
        <div className='Navbar'>
            <div className='navLogo'>
                <img src={props.logoImg} alt="logo" />
            </div>
            <ul className='navItemsUl'>
                {props.navItems.map((curr,i)=>{
                    // if(!isLoginI && curr.url === "logout"){
                    //     // eslint-disable-next-line array-callback-return
                    //     return ;
                    // }
                    if(!isLoginI && curr.url === "cart"){
                        // eslint-disable-next-line array-callback-return
                        return ;
                    }
                    if(!isLoginI && curr.url === "backupReservations"){
                        // eslint-disable-next-line array-callback-return
                        return ;
                    }
                    if(curr.url === "login"){
                        // eslint-disable-next-line array-callback-return
                        return ;
                    }
                    return <li key={i}><Link to={curr.url}>{curr.title}</Link></li>
                    // return <li key={i}><a href={curr.url}>{curr.title}</a></li>
                })}
                {/* {isLoginI? <li><a href="cartIcon"><i>< FaShoppingCart/></i></a><span className="badge badge-danger">2</span></li> :null}  
           */}
 
                {/* {isLoginI? <li><a href="cartIcon">< FaShoppingCart/></a></li> :null}   */}
                {isLoginI? <li><Link to='/cartIcon'>< FaShoppingCart/></Link></li> :null}  

                {isLoginI?  <button onClick={handleLogout}  >LOGOUT</button>:<a href="login">LOGIN</a>}  
            </ul>
        </div>
    )
}
