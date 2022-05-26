import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWindowDimensions } from '../utilities'
import { Context } from '../store/store'
import Header from '../components/Header'


export default function GameHistory() {

    const [state, dispatch] = useContext(Context)
    const [game, setGame] = useState([])

    const gameImages = ['','','','','','']


    const words = ['word 1', 'word 2', 'word 3', 'word 4', 'word 5', 'word 6']

    gameImages.fill(useRef())


    useEffect(() => {
        let sampleGame = []
        for(let i=0;i<6;i++){
            sampleGame.push(words[i])
            sampleGame.push(gameImages[i])
        }
        setGame(sampleGame)
    }, [])

    return(
        <>
            <main className="history">
                <Header />

                {game.map((turn, i) => {
                    const key = `turn--${i}`
                    

                    if(i%2 === 0){
                        return(
                            <h2 key={key} className="history__word">{turn}</h2>
                        )
                    }
                    else{
                        return(
                                <SignatureCanvas
                                    key={key}
                                    canvasProps={{
                                        // width: useWindowDimensions().width, 
                                        width: 414,
                                        height: 414, 
                                        className: 'history__canvas'
                                    }}
                                    backgroundColor='rgb(255,255,255)'
                                />

                        )
                    }
                    
                })}

            </main>
        </>
        
    )
}