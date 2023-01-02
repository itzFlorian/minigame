import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const hit = ["You hit your Enemy!", "OMG, hard hit!", "Wow, that was an amazing hit!"]
const miss = ["Your enemy is way to fast", "You missed him, youre not fast enough!", "Are you stupid or something? YOU MISSED!"]
const parry = ["your broke his armor!", "His armor is nearly cracked!", "hit on armor!"]
const hitDodge = ["he tried to dodge but he wasnt fast enough", "got ya!", "you were to slow"]
const nosense = ["This makes no sense at all!", "please deinstall", "WTF are you doing?", "your mom would be proud! not."]

export default function Fight({playerOne,setPlayerOne,playerTwo,setPlayerTwo}){
    const navigate = useNavigate()
    const [counter, setCounter] = useState(1)
    const [output1, setOutput1] = useState("")
    const [output2, setOutput2] = useState("")

    useEffect(() => {
        if (playerOne.action === "attack"){
            playerTwo.action === "dodge" ? 
            setOutput1(prev => prev = `your probability to hit this shot is ${100 - ((playerTwo.currentUnit.speed * 1.5 ))}%`)
            :
            setOutput1(prev => prev = `your probability to hit this shot is ${100 - (playerTwo.currentUnit.speed)}%`)
        }
            if(playerTwo.action === "attack"){
            playerOne.action === "dodge" ?
            setOutput2(prev => prev = `your probability to hit this shot is ${100 - (playerOne.currentUnit.speed * 1.5)}%`)
            :
            setOutput2(prev => prev = `your probability to hit this shot is ${100 - (playerOne.currentUnit.speed)}%`)
        }
            if(playerOne.action === "parry" || playerTwo.action === "parry"){
                playerOne.action === "parry" && setOutput1(prev => prev= `If your enemy hits your armor will go down to ${playerOne.currentUnit.armor - playerTwo.currentUnit.attack}`)
                playerTwo.action === "parry" && setOutput2(prev => prev= `If your enemy hits your armor will go down to ${playerTwo.currentUnit.armor - playerOne.currentUnit.attack}`)
            }

    }, [playerOne.action, playerTwo.action])

    const nextRound = () => {
        setCounter(prev => prev = counter+1)
        setPlayerOne(prev => prev = {...playerOne, action:""})
        setPlayerTwo(prev => prev = {...playerTwo, action:""})
    }
    const nextFight = () => {
        playerOne.action=""
        playerOne.currentUnit = ""
        setPlayerOne(prev => prev = playerOne)
        playerOne.action=""
        playerTwo.currentUnit = ""
        setPlayerTwo(prev => prev = playerTwo)
        navigate("/battlefield")
    }

    const actionHandlerOne = (event) => {
        setPlayerOne(prev => prev = {...playerOne, action:event.target.name})
    }    
    const actionHandlerTwo = (event) => {
        setPlayerTwo(prev => prev = {...playerTwo, action:event.target.name})
    }

    const fightHandler = (event) => {
        // LET THEM FIGHT!
        const actionOne = playerOne.action
        const actionTwo = playerTwo.action

        // RANDOM NUMBER 1 - 100
        const randomNum = Math.floor(Math.random()*100 +1)
        console.log(randomNum);

        // attack: speed-3, health-(attack)  &&  attack: speed-3, health-(attack) 
        if(actionOne==="attack" && actionTwo==="attack"){
            setOutput1("")
            setOutput2("")
            if(randomNum > playerTwo.currentUnit.speed){
                playerTwo.currentUnit.health = playerTwo.currentUnit.health - playerOne.currentUnit.attack
                setPlayerTwo(prev => prev = playerTwo)
                setOutput1(hit[Math.floor(Math.random()* hit.length)])          
            }else{
                setOutput1(miss[Math.floor(Math.random()* miss.length)])
            }
            if(randomNum > playerOne.currentUnit.speed){
                playerOne.currentUnit.health = playerOne.currentUnit.health - playerTwo.currentUnit.attack
                setPlayerOne(prev => prev = playerOne)
                setOutput2(hit[Math.floor(Math.random()* hit.length)])
            }else{
                setOutput2(miss[Math.floor(Math.random()* miss.length)])
            }
        }

        // ...  &&  parry: speed-1, health-(attack/2)
        if(actionOne==="attack" && actionTwo==="parry"){
            setOutput1("")
            setOutput2("")
            if(randomNum > playerTwo.currentUnit.speed){
                playerTwo.currentUnit.armor -= playerOne.currentUnit.attack
                if(playerTwo.currentUnit.armor < 0){
                    playerTwo.currentUnit.health += playerTwo.currentUnit.armor
                }
                setPlayerTwo(prev => prev = playerTwo)
                setOutput1(parry[Math.floor(Math.random()* parry.length)])
            }else{
                setOutput1(miss[Math.floor(Math.random()* miss.length)]) 
            }
        }

        // ...  &&  dodge: speed-2 
        if(actionOne==="attack" && actionTwo==="dodge"){ 
            setOutput1("")
            setOutput2("") 
            if(randomNum > playerTwo.currentUnit.speed * 1.5){
                playerTwo.currentUnit.health -= playerOne.currentUnit.attack
                setOutput1(hitDodge[Math.floor(Math.random()* hitDodge.length)])
            }else{
                setOutput1(miss[Math.floor(Math.random()* miss.length)])
            }  
            playerTwo.currentUnit.speed = playerTwo.currentUnit.speed * 0.85
            setPlayerTwo(prev => prev = playerTwo) 
        }

        //  parry: speed-1, health-(attack/2)  &&  ...
        if(actionOne==="parry" && actionTwo==="attack"){  
            setOutput1("")
            setOutput2("")  
            if(randomNum > playerOne.currentUnit.speed){
                playerOne.currentUnit.armor -= playerTwo.currentUnit.attack
                if(playerOne.currentUnit.armor < 0){
                    playerOne.currentUnit.health += playerOne.currentUnit.armor
                }
                setOutput2(parry[Math.floor(Math.random()* parry.length)])
            }else{
                setOutput2(miss[Math.floor(Math.random()* miss.length)])
            }            
            setPlayerOne(prev => prev = playerOne)
        }

        //  parry: speed-1  &&  parry: speed-1    
        if(actionOne==="parry" && actionTwo==="parry"){  
            setOutput1("")
            setOutput2("")            
        }

        //  parry: speed-1  &&  dodge: speed-2
        if(actionOne==="parry" && actionTwo==="dodge"){  
            setOutput1("")
            setOutput2("")  
            playerTwo.currentUnit.speed = playerTwo.currentUnit.speed * 0.85
            setPlayerTwo(prev => prev = playerTwo) 
            setOutput1(nosense[Math.floor(Math.random()* nosense.length)])
            setOutput2("That makes no sense at all!")
        }

        //  dodge: speed-2  &&  ...
        if(actionOne==="dodge" && actionTwo==="attack"){  
            setOutput1("")
            setOutput2("")
            if(randomNum > playerOne.currentUnit.speed * 1.5 ){
                playerOne.currentUnit.health -= playerTwo.currentUnit.attack
                setPlayerOne(prev => prev = playerOne)
                setOutput2(hitDodge[Math.floor(Math.random()* hitDodge.length)])
            }else{
                setOutput2(miss[Math.floor(Math.random()* miss.length)])
            }  
            playerOne.currentUnit.speed = playerOne.currentUnit.speed * 0.85
            setPlayerOne(prev => prev = playerOne)
        }

        //  dodge: speed-2  &&  parry: speed-1
        if(actionOne==="dodge" && actionTwo==="parry"){
            setOutput1("")
            setOutput2("")
            playerOne.currentUnit.speed = playerOne.currentUnit.speed * 0.85
            setOutput1("What are you dodging? RUN FOREST RUN!")
            setOutput2(nosense[Math.floor(Math.random()* nosense.length)])
            setPlayerOne(prev => prev = playerOne)
        }

        //  dodge: speed-2  &&  dodge: speed-2
        if(actionOne==="dodge" && actionTwo==="dodge"){   
            setOutput1("")
            setOutput2("")  
            playerOne.currentUnit.speed = playerOne.currentUnit.speed *0.85
            setPlayerOne(prev => prev = playerOne)
            setOutput1("You are both dodging? really?")
            playerTwo.currentUnit.speed = playerTwo.currentUnit.speed *0.85
            setPlayerTwo(prev => prev = playerTwo) 
            setOutput2(nosense[Math.floor(Math.random()* nosense.length)])
        }

        // NULLEN FÜR NÄCHSTE RUNDE
        playerOne.currentUnit.health <= 0 || playerTwo.currentUnit.health <= 0 ?
        nextFight() : nextRound()
    }


    return (
        <>
            <h4>fight.jsx</h4>
            <div>
                <h2>{playerOne.currentUnit.name}</h2>
                <ul>
                    <li>attack: {playerOne.currentUnit.attack}</li>
                    <li>armor: {playerOne.currentUnit.armor}</li>
                    <li>speed: {playerOne.currentUnit.speed.toFixed()}</li>
                    <li>health: {playerOne.currentUnit.health}</li>
                </ul>

                {(counter%2===1 || playerTwo.action) ?
                    <div onClick={actionHandlerOne} >
                        <button name="attack">attack</button> 
                        {playerOne.currentUnit.armor > 0 ? <button name="parry">parry</button> : <button disabled name="parry">parry</button>}
                        {playerOne.currentUnit.speed > 0 ? <button name="dodge">dodge</button> : <button disabled name="dodge">dodge</button>}
                        <h3>{output1}</h3>
                    </div> :
                    <div>
                        <button name="attack" disabled>attack</button>    
                        <button name="parry" disabled>parry</button>                        
                        <button name="dodge" disabled>dodge</button>                     
                        <h3>{output1}</h3>
                    </div>
                }
                </div>
                    {playerOne.action && playerTwo.action ? 
                    <button onClick={fightHandler}>FIGHT</button> : 
                    <button onClick={fightHandler} disabled>FIGHT</button>}
                <div>

                {(counter%2===0 || playerOne.action)? 
                    <div onClick={actionHandlerTwo} >
                        <h3>{output2}</h3>
                        <button name="attack">attack</button>
                        {playerTwo.currentUnit.armor > 0 ? <button name="parry">parry</button> : <button disabled name="parry">parry</button>} 
                        {playerTwo.currentUnit.speed > 0 ? <button name="dodge">dodge</button> : <button disabled name="dodge">dodge</button>}
                    </div> : 
                    <div>
                        <h3>{output2}</h3>
                        <button name="attack" disabled>attack</button>             
                        <button name="parry" disabled>parry</button>           
                        <button name="dodge" disabled>dodge</button>               
                    </div>
                }

                <h2>{playerTwo.currentUnit.name}</h2>
                <ul>
                    <li>attack: {playerTwo.currentUnit.attack}</li>
                    <li>armor: {playerTwo.currentUnit.armor}</li>
                    <li>speed: {playerTwo.currentUnit.speed.toFixed()}</li>
                    <li>health: {playerTwo.currentUnit.health}</li>
                </ul>
            </div>
            <h3>round: {counter}</h3>
        </>
    )
}


