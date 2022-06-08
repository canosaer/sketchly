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
    const [ saved, setSaved ] = useState(false)

    const dimmerStyles = clicked ? 'dimmer dimmer_open' : 'dimmer'
    const transitionStyles = clicked ? 'transition transition_open' : 'transition'

    const url = 'http://localhost:1337'

    const saveGame = () => {

        const image = JSON.stringify(props.image.current.toData())

        const payload = {
            mode: props.mode,
            image: image,
            userName: userName,
            phrase: props.phrase,
        }

        axios.patch(`${url}/games/${state.game.name}`, payload)
            .catch((err)=>{
                console.log(err.message, err.code)
            })

        console.log('data sent')


        let gameObject = {
            contributorNames: state.game.contributorNames,
            name: state.game.name,
        }
        gameObject.contributorNames.push(userName)
        if(state.game.turn === 1){
            gameObject.images = []
            gameObject.images.push(image)
            gameObject.phrases = []
            gameObject.phrases.push(props.phrase)
        }
        else{
            gameObject.images = state.game.images
            gameObject.phrases = state.game.phrases
            if(props.mode==="draw") gameObject.images.push(image)
            else if(props.mode==="label") gameObject.phrases.push(props.phrase)
        }
        dispatch ({type: 'LOAD_GAME', payload: gameObject})
        dispatch ({type: 'UPDATE_ORIGIN', payload: 'submit'})
        setSaved(true)


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
        }
        else{
            unlockScroll()
        } 

    }, [clicked, state])

    return(
        <>
            <div className={transitionStyles}>
                <div className="transition__content">
                    <h2 className="transition__heading">{props.mode === 'draw' ? 'Drawing submitted!' : 'Label submitted!'}</h2>
                    <Link to="/game-history" onMouseOver={!saved ? () => saveGame() : null} className="transition__link">View Turns</Link>
                </div>
            </div>
            <button onClick={() => setClicked(true)} className="draw__submit">
                <div className={dimmerStyles}></div>
                <FontAwesomeIcon className="draw__submit-icon" icon={"check"} />
            </button>
        </>
        
    )
}