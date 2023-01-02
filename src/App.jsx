import './App.css'
import "./index.scss"
import unit from "./data/units.json"
import unit2 from "./data/units2.json"
import { Routes, Route } from "react-router-dom"

// IMPORT
import {useState, useContext} from "react"


// COMPONENTS
import Battlefield from './components/Battlefield.jsx'
import Fight from './components/Fight.jsx'
import Welcome from './components/Welcome.jsx'


// Daten-Import => 1.!!!
import UnitContext from './context/unitContext.jsx'



function App() {

  //Daten-Nutzung => 2.!!!
  // const [units, setUnits] = useContext(UnitContext)

  // VORLAGE BAUEN
  const initPlayerOne = {
    name: "",
    units: unit,
  };


  const initPlayerTwo = {
    name: "",
    units: unit2,
  };



  // immer useState, wenn was verändert wird
  const [playerOne, setPlayerOne] = useState(initPlayerOne)
  const [playerTwo, setPlayerTwo] = useState(initPlayerTwo)



  return (
    <div className="App mcard">
      <Routes>
        <Route
          path="/"
          element={<Welcome/>}
          />
        
        <Route
          path='/battlefield' 
          element={<Battlefield
          playerOne = {playerOne}
          setPlayerOne = {setPlayerOne}
          playerTwo = {playerTwo}
          setPlayerTwo = {setPlayerTwo}
          />}
        />
        <Route 
          path="/fight"
          element={<Fight
            playerOne = {playerOne}
            setPlayerOne = {setPlayerOne}
            playerTwo = {playerTwo}
            setPlayerTwo = {setPlayerTwo}
          />}
         />
      </Routes>

    </div>
  )

}

export default App
