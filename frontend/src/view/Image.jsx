import React, { useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import "../css/Image.css";

export default function Image(props) {
    const { src, className, editing, updateFile } = props;

    if (editing) {
        return (<div className="image-file-label-and-file-name">
            <label className="image-file-label">
                <input
                    className="image-file-input"
                    type="file"
                    accept=".gif, .jpg, .jpeg, .png"
                    onChange={updateFile}
                />
                <HiOutlinePhotograph className="photo-icon"/> Add a photo
            </label>
            {src && <span>...{src}</span>}
        </div>);
    }

    return (<div className="uploaded-image-container">
        <img
            className={className ? className : "uploaded-image"}
            src={src}
        />
    </div>);
}