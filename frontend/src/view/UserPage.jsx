import React from "react";
import { useParams } from "react-router";

export default function UserPage(props) {
    const { username } = useParams();

    return (<div>{username}'s User Page!</div>);
}