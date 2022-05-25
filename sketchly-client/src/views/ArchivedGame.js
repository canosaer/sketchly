import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWindowDimensions } from '../utilities'
import { Context } from '../store/store'
import Header from '../components/Header'


export default function ArchivedGame() {

    const [state, dispatch] = useContext(Context)
    const [games, setGames] = useState([])

    const gameImages = ['','','','','','']
    gameImages.fill(useRef())

    const words = ['example1', 'example2', 'example3', 'example4', 'example5', 'example6']

    useEffect(() => {
        let sampleGame = []
        for(let i=0;i<6;i++){
            sampleGame.push(words[i])
            sampleGame.push(gameImages[i])
        }
        setGames(...games, sampleGame)
        console.log(games)
    }, [])

    return(
        <>
            <main className="guess">
                <Header />
                
                {/* <SignatureCanvas
                    ref={canvas}
                    canvasProps={{
                        // width: useWindowDimensions().width, 
                        width: 414,
                        height: 414, 
                        className: 'guess__canvas'
                    }}
                    backgroundColor='rgb(255,255,255)'
                /> */}

            </main>
        </>
        
    )
}