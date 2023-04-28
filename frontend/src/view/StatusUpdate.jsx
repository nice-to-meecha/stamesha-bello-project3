import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { globalContext } from "./GlobalContext";
import Image from "./Image";
import ModifyStatusUpdate from "./ModifyStatusUpdate";
import UserLink from "./UserLink";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { formatDate, formatErrorMessage } from "../commonUtilities";
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
    const { currUser, setError } = useContext(globalContext);
    const [ editing, setEditing ] = useState(false);
    const staticUserContent = (<div className="static-user-content">
        {
            imageUrl && 
            <Image
                src={imageUrl}
                editing={editing}
            />
        }
        {text && <div>{text}</div>}
    </div>);

    const dropDownMenu = (<div className="drop-down-menu-button status-update-drop-down-menu-button">
        <HiOutlineDotsVertical className={"settings-icon"} />
        <div className="drop-down-menu">
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
                setError(formatErrorMessage(err.response?.data || ""));
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
                setError(formatErrorMessage(err.response?.data || ""));
                console.error("modifyStatusUpdate", err);
            })
    }

    return (<div className="status-update">
        <Link to={`/users/${username}`}>
            <div className="status-update-background" />
        </Link>
        <div className="status-update-header">
            <div className="status-update-meta-data">
                <UserLink
                    username={username}
                    userImage={userImage}
                />
                <div className={"status-update-timestamp"}>
                    {formatDate(timestamp)}
                </div>
                {
                    lastEdited &&
                    <div className={"status-update-timestamp"}>
                        Last Edited: {formatDate(lastEdited)}
                    </div>
                }
            </div>
                {
                    currUser?.username === username &&
                    <div className="status-update-options">{dropDownMenu}</div>
                }
        </div>
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