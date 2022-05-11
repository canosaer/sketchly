import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useTypingHeadlines } from 'use-typing-headlines';

export default function Header() {
    const [menuOpen, setMenuOpen ] = useState(false);
    const [toggleBars, setToggleBars ] = useState([]);
    const [animation, setAnimation] = useState(true)

    const sidebarStyles = menuOpen ? 'menu menu_open' : 'menu'
    const dimmerStyles = menuOpen ? 'dimmer dimmer_open' : 'dimmer'

    const lockScroll = () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop)
        }
    }

    const unlockScroll = () => {
        window.onscroll = function() {}
    }

    useEffect(() => {
        let toggleArray = ['','','']
        toggleArray.fill('toggle__bar')

        if(menuOpen){
            window.scrollTo(0,0)
            lockScroll()
            for(let i=0;i<3; i++){
                toggleArray[i] = toggleArray[i] + ` toggle__bar_${i} toggle__bar_open`
            }
            setToggleBars(toggleArray)
        }
        else{
            unlockScroll()
            for(let i=0;i<3; i++){
                toggleArray[i] = toggleArray[i] + ` toggle__bar_${i}`
            }
            setToggleBars(toggleArray)
        } 

    }, [menuOpen])


    useEffect(() => {
        const timer = setTimeout(() => {
          setAnimation(false)
        }, 2000);
        return () => clearTimeout(timer);
      }, []);

    const [headline] = useTypingHeadlines([
        '',
        'sketch.ly'
      ]);


    return(
        <header className="header">

            <nav className={sidebarStyles}>
                <ul className="menu__list">
                    <li className="menu__item">
                        <Link to="/" className="menu__link">Home <div className="menu__bar"></div> </Link>
                        <Link to="/" className="menu__link">Play Now <div className="menu__bar"></div> </Link>
                        <Link to="/" className="menu__link">Games <div className="menu__bar"></div> </Link>
                    </li>
                </ul>
            </nav>

            <div className={dimmerStyles}></div>
            <button className="toggle" onClick={() => setMenuOpen(!menuOpen)}>
                {toggleBars.map((bar, i) => {
                    const key = `bar--${i}`

                    return(
                        <div key={key} className={bar}></div>
                    )
                })}
            </button>


            <h1 className="header__heading">
                { animation ? headline : 'sketch.ly' }
            </h1>

            <button className="info"><p className="info__text">i</p></button>
        </header>
    )
}