import './App.css';
import { Navbar } from './navbar/Navbar';
import { myNavItemsArr } from './navbar/NavbarItems';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './home-page/Home';
import { Contact } from './contactUs/Contact';
import { Menu } from './menu/Menu';
import { About } from './about/About';
import { LocationAndHours } from './location-hours/LocationAndHours';
import { Reservations } from './reservations/Reservations';
import { Footer } from './footer/Footer';
import { myFooterItemsArr } from './footer/FooterItems';
import { OrderOnline } from './order-online/OrderOnline';
import { ChangeReservation } from './change-reservation/ChangeReservation';
import { DeleteReservation } from './delete-reservation/DeleteReservation';
import { BackupReservations } from './backup-reservations/BackupReservations';
import { Login } from './login.tsx/Login';
import { BookTable } from './bookTable/BookTable';
import { JoinTable } from './joinTable/JoinTable';
import { JoiningTblContact } from './joining-contact/JoiningTblContact';
import { useEffect, useState } from 'react';
import { Signup } from './signup/Signup';
import { CartIcon } from './cartIcon/CartIcon';

import CartContextProvider from './contextAPI/CartContext';



function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setIsLogin(true);
    }
  }, []);

  return (
    <CartContextProvider>
    <div className="App">
    <BrowserRouter>
      <Navbar isLogin={isLogin} isAdmin={isLogin}  navItems = {myNavItemsArr} logoImg={"./restaurant4.png"}/>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="menu" element={<Menu/>} />
        <Route path="about" element={<About/>} />
        <Route path="contact" element={<Contact />} />
        <Route path="locationAndHours" element={<LocationAndHours />} />
        <Route path="orderOnline" element={<OrderOnline />} />
        <Route path="backupReservations" element={<BackupReservations />} />
        <Route path="reservations" element={isLogin ?<Reservations />:<Login  isLogin={isLogin} setIsLogin={setIsLogin} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
        <Route path="changeReservations" element={<ChangeReservation />} />
        <Route path="deleteReservations" element={<DeleteReservation />} />
        <Route path="login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} isAdmin={isAdmin} setIsAdmin={setIsAdmin}  />} />
        <Route path="signup" element={<Signup />} />
        <Route path="bookTable" element={<BookTable />} />
        <Route path="joinTable" element={<JoinTable />} />
        <Route path="joiningTblContact" element={<JoiningTblContact />} />
        <Route path="cartIcon" element={<CartIcon />} />
      </Routes>
      {/* </BrowserRouter> */}
 
      <Footer footerItemsArr={myFooterItemsArr}></Footer>
      </BrowserRouter>
    </div>
    </CartContextProvider>
  );
}

export default App;
