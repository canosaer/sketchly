import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context } from '../store/store'
import { useIdentifier } from '../utilities'
import axios from 'axios'
import Moment from 'react-moment';
import 'moment-timezone';

export default function CurrentGames() {
    const [ state, dispatch ] = useContext(Context)
    const [ games, setGames ] = useState([])
    const [ init, setInit ] = useState(false)

    const identity = useIdentifier()

    const url = 'http://localhost:1337'

    const loadGame = () => {
        // let gameData = {}

        // try {
        //     gameData = await axios.get(`${url}/${name}`)
        // } catch (err) {
        //     console.log(err.message, err.code)
        // }

        // dispatch ({type: 'LOAD_GAME', payload: gameData.data[0]})
    }

    const retrieveGames = async () => {
        try {
          const response = await axios.get(`${url}/games`)
          console.log(response)
          setGames(response.data)
        } catch (err) {
          console.log(err.message, err.code)
        }
    }

    useEffect(() => {
        if(!init){
            retrieveGames()
            setInit(true)
        }
    }, [init, games])

    return(
        <>
            <main className="current-games">
                <Header />
                <h1 className="current-games__heading current-games__heading_start">Start New Game</h1>
                <Link className="current-games__new" to="/new"><FontAwesomeIcon className="current-games__new-icon" icon={"play"} /><span className="current-games__new-text">Start</span></Link>
                <h1 className="current-games__heading current-games__heading_join">Join Current Game</h1>
                <div className="current-games__game-display">
                    {games.map((game, i) => {
                        const key = game._id

                        return(
                            <Link key={key} onClick={loadGame} to="/user" className={game.active ? "game" : "game game_inactive"}>
                                <h2 className="game__name">{game.name}</h2>
                                <p className="game__turn">{`Turn ${game.turn}`}</p>
                                <p className="game__updated">Last Turn: <Moment format="MMM Do" fromNow="true">{game.lastTurn}</Moment></p>
                                {game.password ? <p className="game__password">Password enabled</p> : null}
                                {game.active ? null : <p className="game__alert">Another player is on turn</p>}
                                <p className="game__contributors">Contributors:

                                    {game.contributorNames.map((name, i) => {
                                        const key = `name--${i}`

                                        return(
                                            <span key={key}> {name}{i === game.contributorNames.length-1 ? null : ',' }</span>
                                        )
                                    })}
                                </p>
                            </Link>
                        )
                    })}
                </div>
            </main>
        </>
        
    )
}