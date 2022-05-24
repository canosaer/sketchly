import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWindowDimensions } from '../utilities'
import { Context } from '../store/store'
import GameHeader from '../components/GameHeader'


export default function Guess(props) {

    const [state, dispatch] = useContext(Context)

    const canvas = ['','','','','','']
    const guessInput = useRef()

    useEffect(() => {
        canvas.current.off()
    }, [])

    return(
        <>
            <main className="guess">
                <GameHeader mode="guess" canvas={canvas[0]} guessInput={guessInput}/>
                <SignatureCanvas 
                    ref={canvas}
                    canvasProps={{
                        // width: useWindowDimensions().width, 
                        width: 414,
                        height: 414, 
                        className: 'guess__canvas'
                    }}
                    backgroundColor='rgb(255,255,255)'
                />
                <input className="guess__input" type="text" 
                    ref={guessInput}
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                />
                <button className="guess__submit"><FontAwesomeIcon className="guess__submit-icon" icon={"check"} /><span className="guess__submit-text">Done!</span></button>
            </main>
        </>
        
    )
}