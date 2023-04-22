import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { globalContext } from "./GlobalContext";
import CreateStatusUpdate from "./CreateStatusUpdate";
import StatusUpdateList from "./StatusUpdateList";

export default function Feed(props) {
    const [users, setUsers] = useState([]);
    const { currUser } = useContext(globalContext);

    useEffect(() => {
        axios.get("/api/users")
            .then(data => {
                console.log("Feed Users", data.data)
                setUsers([...data.data]);
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    return (<div>
        {currUser && <CreateStatusUpdate />}
        <StatusUpdateList users={users} />
    </div>);
}