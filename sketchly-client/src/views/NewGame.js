import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDebounce } from '../utilities'

export default function NewGame() {

    const [ name, setName ] = useState('')
    const [ games, setGames ] = useState([])

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
                <h1 className="new-game__heading">Game Name</h1>
                <input className="new-game__input" type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="new-game__submit"><FontAwesomeIcon className="new-game__icon" icon={"play"} /><span className="new-game__submit-text">Create!</span></button>
            </main>
        </>
        
    )
}