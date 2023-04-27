import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { globalContext } from "./GlobalContext";
import Image from "./Image";
import ModifyStatusUpdate from "./ModifyStatusUpdate";
import UserLink from "./UserLink";
import "../css/StatusUpdate.css";

export default function StatusUpdate(props) {
    const { 
            statusUpdateId,
            username,
            userImage,
            timestamp,
            text,
            imageUrl,
            lastEdited,
            refresh,
        } = props;
    const { currUser } = useContext(globalContext);
    const [ editing, setEditing ] = useState(false);
    const staticUserContent = (<div>
        <Image
            src={imageUrl}
            editing={editing}
        />
        <div>{text}</div>
    </div>);

    const dropDownMenu = (<div>
        {/* Replace "Drop-down Button" with hamburger icon (3 vertical dots/lines) */}
        <div>Drop-down Button</div>
        <div>
            <button onClick={editStatusUpdate}>Edit</button>
            <button onClick={deleteStatusUpdate}>Delete</button>
        </div>
    </div>)

    function editStatusUpdate() { 
        setEditing(true);
    }

    function deleteStatusUpdate() {
        axios.delete(`/api/statusUpdates/${statusUpdateId}`)
            .then(data => {
                console.log(data);
            })
            .then(() => {
                refresh();
            })
            .catch(err => {
                console.error(err);
            })
    }

    function modifyStatusUpdate(text, imageUrl) {
        axios.put(
            `/api/statusUpdates/${statusUpdateId}`,
            { 
                username: currUser.username,
                text,
                imageUrl,
                lastEdited: Date.now(),
            }
        )
                .then(data => {
                    console.log(data);
                })
                .then(() => {
                    refresh();
                })
                .catch(err => {
                    console.error(err);
                })
    }

    return (<div className="status-update">
        <Link to={`/users/${username}`}>
            <div className="status-update-background" />
        </Link>
        <UserLink
            username={username}
            userImage={userImage}
        />
        {currUser?.username === username && dropDownMenu}
        <div>Created: {timestamp}</div>
        {lastEdited && <div>Last Edited: {lastEdited}</div>}
        {editing
            ? <ModifyStatusUpdate
                imageUrl={imageUrl}
                text={text}
                submit={modifyStatusUpdate}
            />
            : staticUserContent
        }
    </div>);
}