import React, { useState } from "react";
import ModifyUserImage from "./ModifyUserImage";

export default function ModifyStatusUpdate(props) {
    const { userImage, text } = props;

    return (<div>
        <ModifyUserImage userImage={userImage} />
        <textarea
            defaultValue={text}
            rows={5}
            cols={100}
            name="modifyStatusUpdateText"
        />
        <button>Submit (Currently does nothing)</button>
    </div>);
}