import '../App.css'
import "../index.scss"
import "../style/battlefield.scss"


import { useNavigate } from "react-router-dom"

const Welcome = () =>{
  const navigate = useNavigate()
  return (
  <div className="mcard">
    <h1>Welcome</h1>
    <button onClick={()=>navigate("/battlefield")}>START</button>
  </div>
  )
}

export default Welcome