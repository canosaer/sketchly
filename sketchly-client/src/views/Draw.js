import React, { useState, useRef, useContext, useEffect } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GameHeader from '../components/GameHeader'
import SubmitButton from '../components/SubmitButton'
import { useWindowDimensions } from '../utilities'
import { Context } from '../store/store'
import axios from 'axios'

export default function Draw() {
    const [state, dispatch] = useContext(Context)
    const [penColor, setPenColor] = useState('black')
    const [eraseMode, setEraseMode] = useState(false)
    const [prompt, setPrompt] = useState('')

    const ref = useRef()

    const url = 'http://localhost:1337'


    const updateState = async () => {
        let gameData = {}

        try {
            gameData = await axios.get(`${url}/games/${state.game.name}`)
        } catch (err) {
            console.log(err.message, err.code)
        }

        dispatch ({type: 'LOAD_GAME', payload: gameData.data[0]})
    }

    const updatePrompt = async (phrase) => {
        axios.patch(`${url}/phrases/${state.game.name}`, phrase)
        .then(()=>{
            updateState()
        })
        .catch((err)=>{
            console.log(err.message, err.code)
        })
    }

    const retrievePrompt = async () => {
        try {
            const phrase = await axios.get(`${url}/phrases`)
            setPrompt(phrase.data.content)
            updatePrompt(phrase)
            // dispatch ({type: 'UPDATE_PROMPT', payload: phrase.data.content})
        } catch (err) {
            console.log(err.message, err.code)
        }
    }

    useEffect(() => {
        if(state.game.prompt) setPrompt(state.game.prompt)
        else retrievePrompt()
    }, [prompt])

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
                    <SubmitButton mode="draw" payload={ref} />
                </section>
            </main>
        </>
        
    )
}