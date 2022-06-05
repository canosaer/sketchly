import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Archive() {
    

    // const updateState = async () => {
    //     try {
    //         const gameData = await axios.get(`${url}/games/${name}`)
    //         dispatch ({type: 'LOAD_GAME', payload: gameData.data})
    //     } catch (err) {
    //         console.log(err.message, err.code)
    //     }
    // }

    return(
        <>
            <main className="archive">
                <Header />
                <h1 className="archive__heading">Completed Games</h1>
                <div className="archive__game-display">
                    <Link to="/game-history" className="game">
                        <h2 className="game__name">Brave Traveler</h2>
                        <p className="game__updated">Last Turn: yesterday</p>
                        <p className="game__contributors">Contributors: Mr. Robot, whiterose, unforgiven, scorpion, icegrassy, croissant, ryepudding, messier63, mayonnaise, cometsbeat, tenorikiru, peacheris</p>
                    </Link>

                    <Link to="/game-history" className="game">
                        <h2 className="game__name">Befuddled Housekeeper</h2>
                        <p className="game__updated">Last Turn: May 24th</p>
                        <p className="game__contributors">Contributors: Blahblahblah1, Blahblahblah2, Blahblahblah3, Blahblahblah4, Blahblahblah5, Blahblahblah6, Blahblahblah7, Blahblahblah8, Blahblahblah9, Blahblahblah10, Blahblahblah11</p>
                    </Link>

                    <Link to="/game-history" className="game">
                        <h2 className="game__name">Crazy Unicorn</h2>
                        <p className="game__updated">Last Turn: May 20th</p>
                        <p className="game__contributors">Contributors: dumbo, theminions, cityofgod, figpeddler, trackslime, persona, orangebeef, goggles, biscuits, cloverlog, blackeye, delphinus</p>
                    </Link>

                </div>
            </main>
        </>
        
    )
}