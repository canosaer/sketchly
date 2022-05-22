import React, { useState, useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GameHeader from '../components/GameHeader'
import { useWindowDimensions } from '../utilities'

export default function Draw() {

    const [penColor, setPenColor] = useState('black')
    const [eraseMode, setEraseMode] = useState(false)

    const ref = useRef()

    return(
        <>
            <main className="draw">
                <GameHeader mode="draw" canvas={ref} />
                <SignatureCanvas 
                    ref={ref}
                    penColor={eraseMode ? 'white' : penColor}
                    canvasProps={{
                        // width: useWindowDimensions().width, 
                        width: 414,
                        height: 414, 
                        className: 'draw__canvas'
                    }}
                    backgroundColor='rgb(255,255,255)'
                    maxWidth={eraseMode ? 50 : 2.5}
                />
                <section className="draw__bottom-row">
                    <div className="palette">
                        <figure className="palette__color palette__color_black" onClick={() => {setEraseMode(false); setPenColor('black')}}></figure>
                        <figure className="palette__color palette__color_gray" onClick={() => {setEraseMode(false); setPenColor('gray')}}></figure>
                        <figure className="palette__color palette__color_blue" onClick={() => {setEraseMode(false); setPenColor('blue')}}></figure>
                        <figure className="palette__color palette__color_green" onClick={() => {setEraseMode(false); setPenColor('green')}}></figure>
                        <figure className="palette__color palette__color_red" onClick={() => {setEraseMode(false); setPenColor('red')}}></figure>
                        <figure className="palette__color palette__color_orange" onClick={() => {setEraseMode(false); setPenColor('orange')}}></figure>
                        <figure className="palette__color palette__color_purple" onClick={() => {setEraseMode(false); setPenColor('purple')}}></figure>
                        <figure className="palette__color palette__color_pink" onClick={() => {setEraseMode(false); setPenColor('pink')}}></figure>
                        <figure className="palette__color palette__color_brown" onClick={() => {setEraseMode(false); setPenColor('brown')}}></figure>
                        <figure className="palette__color palette__color_erase" onClick={() => setEraseMode(!eraseMode)}><FontAwesomeIcon className="palette__icon" icon={"eraser"} /></figure>
                    </div>
                    <button className="draw__submit"><FontAwesomeIcon className="draw__submit-icon" icon={"check"} /></button>
                </section>
            </main>
        </>
        
    )
}