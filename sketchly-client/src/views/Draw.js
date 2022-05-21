import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWindowDimensions } from '../utilities'
import { Context } from '../store/store'
import { useTimer } from 'react-timer-hook';

export default function Draw() {

    const [state, dispatch] = useContext(Context)
    const [quitMenuOpen, setQuitMenuOpen ] = useState(false)

    const ref = useRef()

    const dimmerStyles = quitMenuOpen ? 'dimmer dimmer_open' : 'dimmer'
    const quitStyles = quitMenuOpen ? 'quit quit_open' : 'quit'

    const time = new Date()
    time.setSeconds(time.getSeconds() + 80)

    const onExpireFunction = () => {
        console.log('onExpire called')
    }

    const Timer = ({ expiryTimestamp }) => {
        const {
          seconds,
          minutes,
          start,
        } = useTimer({ expiryTimestamp, onExpire: () => onExpireFunction()});
      
      
        return (
            <figure className="timer">
                <FontAwesomeIcon className="timer__stopwatch" icon={"stopwatch"} />
                <div className="timer__circle">
                    <p className="timer__seconds">{seconds + (minutes*60)}</p>
                </div>
            </figure>
                
        )
    }

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
                    penColor='black'
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
                        <figure className="palette__black"></figure>
                        <figure className="palette__gray"></figure>
                        <figure className="palette__blue"></figure>
                        <figure className="palette__green"></figure>
                        <figure className="palette__red"></figure>
                        <figure className="palette__yellow"></figure>
                        <figure className="palette__orange"></figure>
                        <figure className="palette__purple"></figure>
                        <figure className="palette__pink"></figure>
                        <figure className="palette__brown"></figure>
                    </div>
                    <button className="draw__submit"><FontAwesomeIcon className="draw__submit-icon" icon={"check"} /></button>
                </section>
            </main>
        </>
        
    )
}