import './styles/main.scss'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Title from './views/Title'
import CurrentGames from './views/CurrentGames'
import NewGame from './views/NewGame'
import Draw from './views/Draw'
import Guess from './views/Guess'
import Archive from './views/Archive'
import ArchivedGame from './views/ArchivedGame'

import React, {useEffect} from 'react';

import { useWindowDimensions } from './utilities'


function App() {
  const cssRootVariables = document.documentElement.style
  const height = useWindowDimensions().height

  useEffect(() => {
    // const titleHeight = height - 99
    cssRootVariables.setProperty('--height', `${height}px`)
    // cssRootVariables.setProperty('--title-height', `${titleHeight}px`)
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Title />} />
          <Route path="/current-games" element={<CurrentGames />} />
          <Route path="/new" element={<NewGame />} />
          <Route path="/draw" element={<Draw />} />
          <Route path="/guess" element={<Guess />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/archived-game" element={<ArchivedGame />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App