import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context } from '../store/store'
import axios from 'axios'
import { useLocalStorage } from '../utilities'

export default function GameHeader(props) {

    const [ state, dispatch ] = useContext(Context)
    const [ clicked, setClicked ] = useState(false)
    const [ userName, setUserName ] = useLocalStorage('userName', '')
    const [ userID, setUserID ] = useLocalStorage('userID', '')

    const dimmerStyles = clicked ? 'dimmer dimmer_open' : 'dimmer'
    const transitionStyles = clicked ? 'transition transition_open' : 'transition'

    const url = 'http://localhost:1337'

    const saveGame = () => {

        if(props.mode === 'draw'){
            const image = JSON.stringify(props.payload.current.toData())

            const payload = {
                action: 'ADD_DRAW_TURN',
                image: image,
                userName: userName,
            }
    
            axios.patch(`${url}/games/${props.game}`, payload)
                .then(()=>{
                    console.log('turn sent')
                })
                .catch((err)=>{
                    console.log(err.message, err.code)
                })
        }

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
        if(clicked || state.submit){
            if(!clicked) setClicked(true)
            window.scrollTo(0,0)
            lockScroll()
            saveGame()
        }
        else{
            unlockScroll()
        } 

    }, [clicked, state])

    return(
        <>
            <div className={transitionStyles}>
                <div className="transition__content">
                    <h2 className="transition__heading">{props.mode === 'draw' ? 'Drawing submitted!' : 'Guess submitted!'}</h2>
                    <Link to="/current-games" className="transition__link">Continue</Link>
                </div>
            </div>
            <button onClick={() => setClicked(true)} className="draw__submit">
                <div className={dimmerStyles}></div>
                <FontAwesomeIcon className="draw__submit-icon" icon={"check"} />
            </button>
        </>
        
    )
}