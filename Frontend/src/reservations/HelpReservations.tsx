import './Reservations.css'
import { useNavigate } from "react-router-dom";

export function HelpReservations() {

    const navigate = useNavigate();

    return (
        <div className='reservationsPage'>
            <form className="reservationForm">
                <button onClick={() => navigate("/joinTable")}>Join a Table</button>
                <button onClick={() => navigate("/bookTable")}>Book a Table</button>
            </form>
            <div >
                {/* <ul className='changeAndDeleteReservation'>
                    <li><a href="changeReservations">Change Reservation</a></li>
                    <li><a href="deleteReservations">Delete Reservation </a></li>
                </ul> */}
            </div>
        </div>
    )
}
