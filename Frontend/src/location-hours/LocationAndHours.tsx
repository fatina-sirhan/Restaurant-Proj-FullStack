import './LocationAndHours.css'

export function LocationAndHours() {
  return (
    <div className='LocationHoursPage'>
        <form id="LocationHoursForm" >
            <div className='addressDiv'>
                <h2>Address</h2>
                <p>7337 S Rainbow Blvd. #101,</p>
                <p>Las Vegas, NV 89139</p>
            </div>

            <div className='hoursDiv'>
                <h2>Open Hours</h2>
                <p>Sunday - Saturday: 10:00 AM - 11:00 PM</p>
            </div>
        </form>
    </div>
  )
}