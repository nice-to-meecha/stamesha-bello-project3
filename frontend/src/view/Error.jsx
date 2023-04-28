import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "./GlobalContext";
import "../css/Error.css";

export default function Error() {
    const { error, setError } = useContext(globalContext);
    const [ prevErrId, setPrevErrId ] = useState("");

    useEffect(() => {
        if (prevErrId) {
            clearTimeout(prevErrId);
            setPrevErrId("");
        }

        setPrevErrId(setTimeout(() => {
            setError('');
        }, 5000));
    }, [error]);

    if (error) {
        return (<div className="error-message">
            {error}
        </div>);
    }

    return (<></>);
}
