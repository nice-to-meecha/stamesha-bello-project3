import React from "react";

export default function ModifyUserImage(props) {
    const { userImage } = props;
    return (<div>{userImage ? `Modify ${userImage}` : "Add image"}</div>);
}