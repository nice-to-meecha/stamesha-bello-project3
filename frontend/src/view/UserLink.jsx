import React from "react";
import { Link } from "react-router-dom";
import "../css/UserLink.css";

export default function UserLink(props) {
    const { username, userImage } = props;

    return (<div>
        <Link to={`/users/${username}`}>
            <img
                className="user-link-image"
                src="/default_user_image.png"
            />
            <div>{username}</div>
        </Link>
    </div>);
}