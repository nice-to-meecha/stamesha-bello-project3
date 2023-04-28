import { createContext, useState } from "react";

export const globalContext = createContext();

export default function GlobalContext(props) {

    const [ currUser, setCurrUser ] = useState("");
    const [ error, setError ] = useState("");

    const state = {
        currUser,
        setCurrUser,
        error,
        setError,
    }

    return (<globalContext.Provider value={state}>
        {props.children}
    </globalContext.Provider>);
}
