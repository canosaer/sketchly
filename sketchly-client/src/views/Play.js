import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import SignatureCanvas from 'react-signature-canvas'

export default function Play() {
    
    return(
        <>
            <main className="play">
                <Header />
                <SignatureCanvas 
                    penColor='black'
                    canvasProps={{
                        width: 350, 
                        height: 350, 
                        className: 'play__canvas'
                    }}
                    backgroundColor='rgb(255,255,255)'
                />
            </main>
        </>
        
    )
}