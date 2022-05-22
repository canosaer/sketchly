import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CurrentGames() {
    
    return(
        <>
            <main className="current-games">
                <Header />
                <h1 className="current-games__heading current-games__heading_start">Start New Game</h1>
                <Link className="current-games__new" to="/draw"><FontAwesomeIcon className="title-screen__icon" icon={"play"} /> Start</Link>
                <h1 className="current-games__heading current-games__heading_join">Join Current Game</h1>
                <div className="current-games__game-display">
                    <Link to="/guess" className="game game_active">
                        <h2 className="game__name">Brave Traveler</h2>
                        <p className="game__turn">Turn 3</p>
                        <p className="game__updated">Last Turn: a few minutes ago</p>
                        <p className="game__contributors">Contributors: Mr. Robot, Whiterose</p>
                    </Link>

                    <Link to="/guess" className="game game_inactive">
                        <h2 className="game__name">Befuddled Housekeeper</h2>
                        <p className="game__turn">Turn 12</p>
                        <p className="game__updated">Last Turn: yesterday</p>
                        <p className="game__password">Password enabled</p>
                        <p className="game__alert">Another player is on turn</p>
                        <p className="game__contributors">Contributors: Blahblahblah1, Blahblahblah2, Blahblahblah3, Blahblahblah4, Blahblahblah5, Blahblahblah6, Blahblahblah7, Blahblahblah8, Blahblahblah9, Blahblahblah10, Blahblahblah11</p>
                    </Link>

                    <Link to="/guess" className="game game_active">
                        <h2 className="game__name">Crazy Unicorn</h2>
                        <p className="game__turn">Turn 2</p>
                        <p className="game__updated">Last Turn: May 10th</p>
                        <p className="game__contributors">Contributors: Dumbo</p>
                    </Link>

                </div>
            </main>
        </>
        
    )
}