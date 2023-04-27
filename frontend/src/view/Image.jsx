import React, { useState } from "react";
import "../css/Image.css";

export default function Image(props) {
    const { src, className, editing, updateFile } = props;

    if (editing) {
        return (<div>
            <input type="file" onChange={updateFile} />
        </div>);
    }

    return (<div>
        <img
            className={className ? className : "uploaded-image"}
            src={src}
        />
    </div>);
}