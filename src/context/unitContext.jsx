import { createContext, useState } from "react";
import units from "../data/units.json"



// CONTEXT 1.) create
const UnitContext = createContext(["context", () => {}])



// PROVIDER 1.) create provider
const UnitContextProvider = (props) => {
// PROVIDER 2.) create fuel
    const unitContext = useState(units)
// PROVIDER 3.) fill up
    return < UnitContext.Provider value={unitContext}> {props.children} </UnitContext.Provider>
}



// CONTEXT 2.) exportieren
export default UnitContext;



// PROVIDER 4.) export provider
export { UnitContextProvider }