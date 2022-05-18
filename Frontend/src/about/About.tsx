import { useEffect } from 'react'
import './About.css'
import { allElemObj } from './aboutJson'



export function About() {

    useEffect(() => {
        (document.querySelector('.aboutUsText') as HTMLElement).innerHTML = allElemObj.aboutInnerHTML
    }
    , [])


    return (
        <div className="aboutUsText"></div>
    )
}
