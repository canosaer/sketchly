import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWindowDimensions } from '../utilities'
import { Context } from '../store/store'
import { useTimer } from 'react-timer-hook';
import Timer from '../components/TImer'

export default function Draw() {

    const [state, dispatch] = useContext(Context)
    const [quitMenuOpen, setQuitMenuOpen ] = useState(false)
    const [penColor, setPenColor] = useState('black')

    const ref = useRef()

    const time = new Date()
    time.setSeconds(time.getSeconds() + 80)

    const dimmerStyles = quitMenuOpen ? 'dimmer dimmer_open' : 'dimmer'
    const quitStyles = quitMenuOpen ? 'quit quit_open' : 'quit'

    const lockScroll = () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop)
        }
    }

    const unlockScroll = () => {
        window.onscroll = function() {}
    }

    useEffect(() => {

        if(quitMenuOpen){
            window.scrollTo(0,0)
            lockScroll()
        }
        else{
            unlockScroll()
        } 

    }, [quitMenuOpen])

    return(
        <>
            <main className="draw">
                <header className="header">
                    <button className="header__button header__button_erase" onClick={() => ref.current.clear()} ><FontAwesomeIcon className="header__icon header__icon_erase" icon={"eraser"} /></button>
                    <Timer expiryTimestamp={time} />
                    <button className="header__button header__button_quit" onClick={() => setQuitMenuOpen(!quitMenuOpen)}><FontAwesomeIcon className="header__icon header__icon_quit" icon={"xmark"} /></button>
                    <div className={quitStyles}>
                        <div className="quit__content">
                            <h2 className="quit__heading">Are you sure you want to quit?</h2>
                            <button className="quit__button quit__button_cancel" onClick={() => setQuitMenuOpen(false)}>Cancel</button>
                            <Link to="/current-games" className="quit__link"><button className="quit__button quit__button_confirm">Quit</button></Link>
                        </div>
                    </div>
                    <div className={dimmerStyles}></div>
                    <h2 className="header__prompt">Draw: {state.prompt}</h2>
                </header>
                <SignatureCanvas 
                    ref={ref}
                    penColor={penColor}
                    canvasProps={{
                        // width: useWindowDimensions().width, 
                        width: 414,
                        height: 414, 
                        className: 'draw__canvas'
                    }}
                    backgroundColor='rgb(255,255,255)'
                />
                <section className="draw__bottom-row">
                    <div className="palette">
                        <figure className="palette__color palette__color_black" onClick={() => setPenColor('black')}></figure>
                        <figure className="palette__color palette__color_gray" onClick={() => setPenColor('gray')}></figure>
                        <figure className="palette__color palette__color_blue" onClick={() => setPenColor('blue')}></figure>
                        <figure className="palette__color palette__color_green" onClick={() => setPenColor('green')}></figure>
                        <figure className="palette__color palette__color_red" onClick={() => setPenColor('red')}></figure>
                        <figure className="palette__color palette__color_yellow" onClick={() => setPenColor('yellow')}></figure>
                        <figure className="palette__color palette__color_orange" onClick={() => setPenColor('orange')}></figure>
                        <figure className="palette__color palette__color_purple" onClick={() => setPenColor('purple')}></figure>
                        <figure className="palette__color palette__color_pink" onClick={() => setPenColor('pink')}></figure>
                        <figure className="palette__color palette__color_brown" onClick={() => setPenColor('brown')}></figure>
                    </div>
                    <button className="draw__submit"><FontAwesomeIcon className="draw__submit-icon" icon={"check"} /></button>
                </section>
            </main>
        </>
        
    )
}