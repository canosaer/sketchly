import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Store} from './store/store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faEraser, faXmark, faStopwatch, faCheck } from '@fortawesome/free-solid-svg-icons'
// import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

library.add(faPlay, faEraser, faXmark, faStopwatch, faCheck)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
);