import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import CreateStatusUpdate from "./CreateStatusUpdate";
import Description from "./Description";
import StatusUpdateList from "./StatusUpdateList";
import { globalContext } from "./GlobalContext";
import { formatDate, formatErrorMessage } from "../commonUtilities";
import "../css/UserPage.css";

export default function UserPage(props) {
    const { username } = useParams();
    const [user, setUser] = useState(undefined);
    const [statusUpdateListKey, setStatusUpdateListKey] = useState(true);
    const { currUser, setError } = useContext(globalContext);

    useEffect(() => {
        getUser();
    }, [])

    function getUser() {
        axios.get(`/api/users/username/${username}`)
            .then(data => {
                console.log("UserPage user", data.data);
                setUser(data.data);
            })
            .catch(err => {
                setError(formatErrorMessage(err.response?.data || ""));
                console.error(err)
            })
    }

    function refreshStatusUpdates() {
        setStatusUpdateListKey(!statusUpdateListKey);
    }

    function modifyDescription(description) {
        axios.put(`/api/users/${user._id}`, { user, description })
            .then(data => {
                console.log(data);
            })
            .then(data => {
                getUser();
            })
            .catch(err => {
                setError(formatErrorMessage(err.response?.data || ""));
                console.error(err);
            })
    }

    if (!user) {
        return (<div>{username} isn't an existing account</div>)
    }

    return (<div className="user-page">
        {/* <div className="username-image-combo"> */}
            <div>
                <img
                    className="user-page-image"
                    src={user.userImage
                        ? user.userImage
                        : "/default_user_image.svg"
                    }
                />
            </div>
        {/* </div> */}
        <div className="user-page-info">
            <div className="user-page-username">
                {user.username.toUpperCase()}
            </div>
            <div className="time-joined">
                Joined {formatDate(user.timeJoined)}
            </div>
            <Description
                description={user.description}
                submit={modifyDescription}
            />
        </div>
        {currUser?.username === username && <CreateStatusUpdate refresh={refreshStatusUpdates} />}
        <StatusUpdateList
            users={[user]}
            key={statusUpdateListKey}
            refresh={refreshStatusUpdates}
        />
    </div>);
}