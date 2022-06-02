import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context } from '../store/store'
import { useIdentifier } from '../utilities'
import axios from 'axios'

export default function CurrentGames() {
    const [state, dispatch] = useContext(Context)

    const identity = useIdentifier()

    const loadGame = () => {
        // let gameData = {}

        // try {
        //     gameData = await axios.get(`${url}/${name}`)
        // } catch (err) {
        //     console.log(err.message, err.code)
        // }

        // dispatch ({type: 'LOAD_GAME', payload: gameData.data[0]})
    }

    return(
        <>
            <main className="current-games">
                <Header />
                <h1 className="current-games__heading current-games__heading_start">Start New Game</h1>
                <Link className="current-games__new" to="/new"><FontAwesomeIcon className="current-games__new-icon" icon={"play"} /><span className="current-games__new-text">Start</span></Link>
                <h1 className="current-games__heading current-games__heading_join">Join Current Game</h1>
                <div className="current-games__game-display">
                    <Link onClick={ ()=> loadGame() } to="/user" className="game game_active">
                        <h2 className="game__name">Brave Traveler</h2>
                        <p className="game__turn">Turn 3</p>
                        <p className="game__updated">Last Turn: a few minutes ago</p>
                        <p className="game__contributors">Contributors: mrrobot, whiterose</p>
                    </Link>

                    <Link onClick={ ()=> loadGame() } to="/user" className="game game_inactive">
                        <h2 className="game__name">Befuddled Housekeeper</h2>
                        <p className="game__turn">Turn 12</p>
                        <p className="game__updated">Last Turn: yesterday</p>
                        <p className="game__password">Password enabled</p>
                        <p className="game__alert">Another player is on turn</p>
                        <p className="game__contributors">Contributors: Blahblahblah1, Blahblahblah2, Blahblahblah3, Blahblahblah4, Blahblahblah5, Blahblahblah6, Blahblahblah7, Blahblahblah8, Blahblahblah9, Blahblahblah10</p>
                    </Link>

                    <Link onClick={ ()=> loadGame() } to="/user" className="game game_active">
                        <h2 className="game__name">Crazy Unicorn</h2>
                        <p className="game__turn">Turn 2</p>
                        <p className="game__updated">Last Turn: May 10th</p>
                        <p className="game__contributors">Contributors: dumbo</p>
                    </Link>

                </div>
            </main>
        </>
        
    )
}