import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWindowDimensions } from '../utilities'
import Timer from '../components/TImer'

export default function Draw() {

    const time = new Date();
    time.setSeconds(time.getSeconds() + 80);
    
    return(
        <>
            <main className="draw">
                <header className="header">
                    <button className="header__erase"><FontAwesomeIcon className="header__erase-icon" icon={"eraser"} /></button>
                    <Timer expiryTimestamp={time} />
                    <button className="header__quit"><FontAwesomeIcon className="header__quit" icon={"xmark"} /></button>
                </header>
                <SignatureCanvas 
                    penColor='black'
                    canvasProps={{
                        // width: useWindowDimensions().width, 
                        width: 414,
                        height: 350, 
                        className: 'draw__canvas'
                    }}
                    backgroundColor='rgb(255,255,255)'
                />
            </main>
        </>
        
    )
}