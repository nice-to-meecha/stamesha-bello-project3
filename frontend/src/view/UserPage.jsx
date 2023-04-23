import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import CreateStatusUpdate from "./CreateStatusUpdate";
import StatusUpdateList from "./StatusUpdateList";
import { globalContext } from "./GlobalContext";

export default function UserPage(props) {
    const { username } = useParams();
const [user, setUser] = useState([]);
    const [statusUpdateListKey, setStatusUpdateListKey] = useState(true);
    const { currUser } = useContext(globalContext);

    useEffect(() => {
        axios.get(`/api/users/username/${username}`)
            .then(data => {
                console.log("UserPage user", data.data)
                setUser([data.data]);
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    function refreshStatusUpdates() {
        setStatusUpdateListKey(!statusUpdateListKey);
    }

    if (!user.length) {
        return (<div>{username} isn't an existing account</div>)
    }

    return (<div>
        {username}'s User Page!
        {currUser?.username === username && <CreateStatusUpdate refresh={refreshStatusUpdates} />}
        <StatusUpdateList
            users={user}
            key={statusUpdateListKey}
        />
    </div>);
}