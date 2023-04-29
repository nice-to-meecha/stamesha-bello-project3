import React, { useContext, useState } from "react";
import axios from "axios";
import Image from "./Image";
import { globalContext } from "./GlobalContext";
import { formatErrorMessage } from "../commonUtilities";
import ModifyStatusUpdateImage from "./ModifyStatusUpdateImage";
import "../css/ModifyStatusUpdate.css";

export default function ModifyStatusUpdate(props) {
    const { imageUrl, text, submit, memoId } = props;
    const [url, setUrl] = useState(imageUrl);
    const [file, setFile] = useState("");
    const [memo, setMemo] = useState(text);
    const { setError } = useContext(globalContext);

    function updateMemo(event) {
        setMemo(event.target.value);
    }

    function updateFile(event) {
        const newFile = event.target.files?.[0]
        setFile(newFile);
        console.log("Setting URL to", newFile.name);
        setUrl(newFile
            // ? path.join("..", "backend", "data", newFile.name)
            ? `/${newFile.name}`
            : ""
        );
    }

    function postFile() {
        const formData = new FormData();
        formData.append("file", file);
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
            responseEncoding: "base64",
        }
        axios.post("/api/images", formData, config)
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                setError(formatErrorMessage(err.response?.data || ""));
                console.error(err);
            })
    }

    function submitInfo() {
        postFile();
        submit(memo, url);
        setMemo("");
        setUrl("");
    }

    return (<div className="modify-status-update">
        <div className="modify-status-update-image">
            <Image
                src={url}
                updateFile={updateFile}
                editing={true}
            />
        </div>
        <textarea
            value={memo}
            name="modifyStatusUpdateText"
            onInput={updateMemo}
            id={memoId ? memoId : "modify-status-update-memo"}
        />
        <button
            className="modify-status-update-submit-button"
            onClick={submitInfo}
        >
            Submit
        </button>
    </div>);
}