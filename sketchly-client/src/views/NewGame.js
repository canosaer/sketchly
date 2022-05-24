import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDebounce } from '../utilities'

export default function NewGame() {

    const [ name, setName ] = useState('')
    const [ passwordOn, setPasswordOn ] = useState(false)
    const [ password, setPassword ] = useState('')
    const [ games, setGames ] = useState([])
    const [ error, setError ] = useState('none')

    const debouncedGameName = useDebounce(name, 500)

    // const url = `${baseURL}${searchPath}?api_key=${apiKey}${extraParams}`;

    // const getGames = async (url, query) => {
    //     try {
    //       const response = await axios.get(`${url}&query=${query}`)
    //       console.log(response)
    //       setGames(response.data.results)
    //     } catch (err) {
    //       console.log(err.message, err.code)
    //     }
    // }

    // useEffect(() => {
    //     if(debouncedGameName){
    //       getGames(url, debouncedGameName)
    //     } else{
    //       setGames([])
    //     }
    // }, [debouncedGameName, url])
    

    return(
        <>
            <main className="new-game">
                <Header />
                <h2 className="new-game__heading new-game__heading_name">Game Name</h2>
                <input className="new-game__input" type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <p className={error !== 'none' ? "new-game__error" : "new-game__error transparent"}>{error}</p>
                <h2 className="new-game__heading new-game__heading_password">Password</h2>
                <label className="new-game__switch">
                    <input className="new-game__checkbox" type="checkbox" onClick={() => {setPasswordOn(!passwordOn)}}/>
                    <span className="new-game__slider"></span>
                </label>
                <label className={passwordOn ? "new-game__password" : "new-game__password invisible"}>
                    <input className="new-game__input new-game__input_password" type="text" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <Link to="/draw" className="new-game__submit"><FontAwesomeIcon className="new-game__icon" icon={"play"} /><span className="new-game__submit-text">Begin</span></Link>
                
            </main>
        </>
        
    )
}