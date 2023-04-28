import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { globalContext } from "./GlobalContext";
import CreateStatusUpdate from "./CreateStatusUpdate";
import StatusUpdateList from "./StatusUpdateList";
import { formatErrorMessage } from "../commonUtilities";

export default function Feed(props) {
    const [users, setUsers] = useState([]);
    const [statusUpdateListKey, setStatusUpdateListKey] = useState(true)
    const { currUser, setError } = useContext(globalContext);

    useEffect(() => {
        axios.get("/api/users")
            .then(data => {
                setUsers([...data.data]);
            })
            .catch(err => {
                setError(formatErrorMessage(err.response?.data || ""));
                console.error(err);
            })
    }, [])

    function refreshStatusUpdates() {
        setStatusUpdateListKey(!statusUpdateListKey);
    }

    return (<div>
        {currUser && <CreateStatusUpdate refresh={refreshStatusUpdates} />}
        <StatusUpdateList
            users={users}
            key={statusUpdateListKey}
            refresh={refreshStatusUpdates}
        />
    </div>);
}