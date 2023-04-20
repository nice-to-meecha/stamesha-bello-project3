import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { globalContext } from "./GlobalContext";
import ModifyStatusUpdate from "./ModifyStatusUpdate";
import UserLink from "./UserLink";

export default function StatusUpdate(props) {
    const { 
            statusUpdateId,
            username,
            userImage,
            timestamp,
            text,
            imageUrl,
        } = props;
    const { currUser } = useContext(globalContext);
    const staticUserContent = (<div>
        <div>{imageUrl}</div>
        <div>{text}</div>
    </div>);
    const [ editing, setEditing ] = useState(false);

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

    async function deleteStatusUpdate() {
        axios.delete(`/api/statusUpdates/${statusUpdateId}`)
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (<div>
        <Link to={`/users/${username}`}>
            <UserLink
                username={username}
                userImage={userImage}
            />
            {currUser.username === username && dropDownMenu}
            <div>{timestamp}</div>
            {editing
                ? <ModifyStatusUpdate
                    userImage={userImage}
                    text={text}
                />
                : {staticUserContent}
            }
        </Link>
    </div>);
}