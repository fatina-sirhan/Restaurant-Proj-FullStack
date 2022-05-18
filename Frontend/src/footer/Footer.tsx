
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import './Footer.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import {
//     faFacebook, faInstagram,faTwitter
// } from '@fortawesome/free-brands-svg-icons'


export function Footer(props:
    {
        footerItemsArr:{title: string,displayStr:string, hrefStr: string, details: string}[]
    }) {

    return (
        <div className='mainFooter'>
            <ul className='footerItems'>
                {props.footerItemsArr.map((curr,i)=>(
                    <li key={i}>
                        <h2>{curr.title}</h2>
                        <a href={curr.hrefStr}>
                            {curr.displayStr}
                        </a>
                        <p>{curr.details}</p>
                    </li>
                ))}
                <li>
                    <h2>FOLLOW US</h2>
                    <div className='social-media-div'>
                        <a className='facebookA' href="https://www.facebook.com"> < FaFacebookF/></a>
                        <a className='instagramA' href="https://www.instagram.com"> <FaInstagram/> </a>
                        {/* <a href="https://www.twitter.com"> < FaTwitter/></a> */}
                    </div>
                </li>
            </ul>  

            
            {/* <div>
                <a href="https://www.facebook.com"> < FaFacebookF/></a>
                <a href="https://www.instagram.com"> <FaInstagram/> </a>
                <a href="https://www.twitter.com"> < FaTwitter/></a>
            </div> */}


            <div className='row'>
                <hr />  
                <p> &copy;{new Date().getFullYear()} Fatina Sirhan | All Rights Reserved | Terms Of Serivce | Privacy </p>
            </div>     
        </div>    
    )
}

