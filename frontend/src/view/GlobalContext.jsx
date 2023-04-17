import { createContext, useState } from "react";

export const globalContext = createContext();

export default function GlobalContext(props) {

    const [ currUser, setCurrUser ] = useState("");

    const state = {
        currUser,
        setCurrUser,
    }

    return (<globalContext.Provider value={state}>
        {props.children}
    </globalContext.Provider>);
}
