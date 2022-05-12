import './styles/main.scss'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Title from './views/Title'
import CurrentGames from './views/CurrentGames'
import Play from './views/Play'

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
          <Route path="/play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App