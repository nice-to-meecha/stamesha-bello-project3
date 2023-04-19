import React from "react";
import { Link } from "react-router-dom";

export default function UserLink(props) {
    const { username, userImage } = props;

    return (<div>
        <Link to={`/users/${username}`}>
            <div>{username}</div>
            <div>IMAGE PLACEHOLDER: {userImage}</div>
        </Link>
    </div>);
}