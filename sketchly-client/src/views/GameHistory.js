import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas'
import { useWindowDimensions } from '../utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context } from '../store/store'
import Header from '../components/Header'
import axios from 'axios'


export default function GameHistory() {

    const [ state, dispatch ] = useContext(Context)
    const [ game, setGame ] = useState({})
    const [ turns, setTurns ]  = useState([])

    const url = 'http://localhost:1337'

    const ref = useRef()

    const loadGame = async () => {
        try {
            const gameData = await axios.get(`${url}/games/${state.game.name}`)
            setGame(gameData.data)
        } catch (err) {
            console.log(err.message, err.code)
        }
    }

    const loadImage = (canvas, image) => {
        if(canvas){
            setTimeout(() => {
                canvas.current.fromData(JSON.parse(image))
            }, "100")
        }
    }

    useEffect(() => {
        if(game.phrases && !turns[0]){
            let gameTurns = []
            for(let i=0;i<6;i++){
                if(game.phrases[i]) gameTurns.push(game.phrases[i])
                if(game.images[i]) gameTurns.push(game.images[i])
            }
            setTurns(gameTurns)
        }
    }, [game])

    useEffect(() => {
        loadGame()
    }, [state])

    return(
        <>
            <main id="history-top" className="history">
                <Header />
                <h2 className="history__heading">{state.game.name}</h2>

                {turns[0] ? 
                    turns.map((turn, i) => {
                        const key = `turn--${i}`
                
                        if(i%2 === 0){
                            return(
                                <h2 key={key} className="history__word">{turn}</h2>
                            )
                        }
                        else{
                            return(
                                <div key={key}>
                                    <SignatureCanvas
                                        ref={ref}
                                        canvasProps={{
                                            width: 414,
                                            height: 414, 
                                            className: 'history__canvas'
                                        }}
                                        backgroundColor='rgb(255,255,255)'
                                    />
                                    {loadImage(ref, turn)}
                                </div>
                            )
                        }
                    })
                    :
                    <FontAwesomeIcon className="history__loading" icon={"circle-notch"} />
            
                }

                {/* // {turns.map((turn, i) => {
                //     const key = `turn--${i}`
             
                //     if(i%2 === 0){
                //         return(
                //             <h2 key={key} className="history__word">{turn}</h2>
                //         )
                //     }
                //     else{
                //         return(
                //             <div key={key}>
                //                 <SignatureCanvas
                //                     ref={ref}
                //                     canvasProps={{
                //                         width: 414,
                //                         height: 414, 
                //                         className: 'history__canvas'
                //                     }}
                //                     backgroundColor='rgb(255,255,255)'
                //                 />
                //                 {loadImage(ref, turn)}
                //             </div>
                //         )
                //     }
                    
                // })} */}

                <div className="history__link-row">
                    <Link to="/current-games" className="history__link history__link_current">Current Games</Link>
                    <Link to="/archive" className="history__link history__link_archive">Completed Games</Link>
                </div>

            </main>
        </>
        
    )
}