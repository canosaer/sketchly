import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { Context } from '../store/store'
import axios from 'axios';

export default function User() {
    const [ state, dispatch ] = useContext(Context)
    const [ userName, setUserName ] = useState('')
    const [ touched, setTouched ] = useState(false)
    const [ userID, setUserID ] = useState('')

    const url = 'http://localhost:1337/games'
    const uniqueID = useId()
    const sketchlyKey = 'Rtoz88nwmfp'

    // const enterGame = async () => {
    //     dispatch ({type: 'UPDATE_USER', payload: userName})

    //     query = {
    //         gameName: state.game
    //     }

    //     axios.post(url, state.game)
    //         .then(()=>{
                
    //         })
    //         .catch(()=>{

    //         })
    // }

    return(
        <>
            <main className="user">
                <Header />
                <h2 className="user__heading">User Name</h2>
                <input className="user__input" type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <p onFocus={()=>!touched ? setTouched(true) : null} className={ !userName && touched ? "user__error" : "user__error transparent"}>Required</p>
                <Link onClick={ userName ? enterGame : null } to={ userName ? `/${state.dest}` : '/user' } className="user__submit">Ready!</Link>
            </main>
        </>
        
    )
}