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
    // const effectiveHeight = height < 710 ? 710 : height
    cssRootVariables.setProperty('--height', `${height}px`)
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