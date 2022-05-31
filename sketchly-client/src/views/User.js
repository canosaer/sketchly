import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { Context } from '../store/store'

export default function User() {
    const [ state, dispatch ] = useContext(Context)
    const [ userName, setUserName ] = useState('')
    const [ touched, setTouched ] = useState(false)

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
                <Link onClick={ userName ? ()=>{ dispatch ({type: 'UPDATE_USER', payload: userName}) } : null } to={ userName ? `/${state.dest}` : '/user' } className="user__submit">Ready!</Link>
            </main>
        </>
        
    )
}