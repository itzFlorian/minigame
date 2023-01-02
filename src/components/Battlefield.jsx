
import React from 'react'
import { useNavigate } from "react-router-dom"


export default function Battlefield({
    playerOne, 
    setPlayerOne, 
    playerTwo, 
    setPlayerTwo}){

    const navigate = useNavigate()

    const handleUnitOne = (event) => {
        const allLamps = document.querySelectorAll(".light-active")
        const lampen = [...allLamps]
        allLamps.length > 0 && lampen.map(lamp => lamp.classList.remove("light-active"))
        const lamp = event.target.nextSibling
        lamp.classList.add("light-active")
        const selectedUnit = event.target.value
        const currentUnit = playerOne.units.find(unit => unit.name === selectedUnit)
        setPlayerOne(prev => prev = {...playerOne, currentUnit})
    }
    const handleUnitTwo = (event) => {
        const allLamps = document.querySelectorAll(".light-active-two")
        const lampen = [...allLamps]
        allLamps.length > 0 && lampen.map(lamp => lamp.classList.remove("light-active-two"))
        const lamp = event.target.nextSibling
        lamp.classList.add("light-active-two")
        const selectedUnit = event.target.value
        const currentUnit = playerTwo.units.find(unit => unit.name === selectedUnit)
        setPlayerTwo(prev => prev = {...playerTwo, currentUnit})
    }
    const handleStart = (event) => {
        navigate("/fight")
    }

    return (
        <>
            <h4>battlefield.jsx</h4>            
            <div className="mcard">
            <h2>choose your unit</h2>
            <div className="flex">{
                playerOne.units.map(unit =>{
                    return(unit.health > 0 ?
                        <div className="mpadding-c2">
                            <ul>
                                <h4 className="mtop-0">{unit.name}</h4>
                                <li>attack: {unit.attack}</li>
                                <li>armor: {unit.armor}</li>
                                <li>speed: {unit.speed.toFixed()}</li>
                                <li>health: {unit.health}</li>
                            </ul>
                            <div>
                                <button id='button' onClick={handleUnitOne} value={unit.name}>select</button>
                                <div className='light-passiv'></div>
                            </div>
                        </div>
                        :
                        <div className='crossed'>
                            <ul>
                                <h4 className="mtop-0">{unit.name}</h4>
                                <li>attack: {unit.attack}</li>
                                <li>armor: {unit.armor}</li>
                                <li>speed: {unit.speed.toFixed()}</li>
                                <li>health: {unit.health}</li>
                            </ul>
                            <div>
                                <button id='button' onClick={handleUnitOne} disabled value={unit.name}>select</button>
                                <div className='light-passiv'></div>
                            </div>
                        </div>
                        )
                })}
                </div>
                </div>


            {playerOne.currentUnit && playerTwo.currentUnit ? <button onClick = { handleStart }>start</button>: <button disabled onClick = { handleStart }>start</button>}

            
            <div className="mcard">
            <h2>your enemy</h2>
            <div className="flex">{
                playerTwo.units.map(unit =>{ 
                    return(unit.health > 0 ?
                        <div className="mpadding-c2">
                            <ul>
                                <h4 className="mtop-0">{unit.name}</h4>
                                <li>attack: {unit.attack}</li>
                                <li>armor: {unit.armor}</li>
                                <li>speed: {unit.speed.toFixed()}</li>
                                <li>health: {unit.health}</li>
                            </ul>
                            <div>
                                <button id='button' onClick={handleUnitTwo} value={unit.name}>select</button>
                                <div className='light-passiv'></div>
                                
                            </div>
                        </div> 
                        : 
                        <div className='crossed'>
                        <ul>
                            <h4 className="mtop-0">{unit.name}</h4>
                            <li>attack: {unit.attack}</li>
                            <li>armor: {unit.armor}</li>
                            <li>speed: {unit.speed.toFixed()}</li>
                            <li>health: {unit.health}</li>
                        </ul>
                        <div>
                            <button disabled id='button' onClick={handleUnitTwo} value={unit.name}>select</button>
                            <div className='light-passiv'></div>
                        </div>
                    </div>)
                })}
                </div>
                </div>
        </>
    )
}

