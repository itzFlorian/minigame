import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'

// 
import {BrowserRouter} from "react-router-dom"

// provider importieren
import {UnitContextProvider} from "./context/unitContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <UnitContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </UnitContextProvider>
)
