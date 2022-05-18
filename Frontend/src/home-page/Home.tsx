import { useEffect } from 'react'
import './Home.css'
import { hAllElemObj } from './homeJson'


export function Home() {

    useEffect(() => {
        (document.querySelector('.theHome') as HTMLElement).innerHTML = hAllElemObj.homeInnerHTML
    }
    , [])


    return (
        <div className='theHome'> </div>
    ) 
}
