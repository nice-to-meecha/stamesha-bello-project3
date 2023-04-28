import React from "react";
import { Link } from "react-router-dom";
import "../css/UserLink.css";

export default function UserLink(props) {
    const { username, userImage } = props;

    return (<div>
        <Link
            className="user-link"
            to={`/users/${username}`}
        >
            <div className="user-link-image-container">
                <img
                    className="user-link-image"
                    src="/default_user_image.png"
                />
            </div>
            <div>{username}</div>
        </Link>
    </div>);
}