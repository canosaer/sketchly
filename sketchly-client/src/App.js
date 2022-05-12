import './styles/main.scss'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Title from './views/Title'

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App