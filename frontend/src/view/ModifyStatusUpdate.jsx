import React, { useState } from "react";
import axios from "axios";
import Image from "./Image";
import ModifyStatusUpdateImage from "./ModifyStatusUpdateImage";

export default function ModifyStatusUpdate(props) {
    const { imageUrl, text, submit, memoId } = props;
    const [url, setUrl] = useState(imageUrl);
    const [file, setFile] = useState("");
    const [memo, setMemo] = useState(text);

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
        formData.append("filename", file.name);
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        }
        axios.post("/api/images", formData, config)
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function submitInfo() {
        postFile();
        submit(memo, url);
        // setMemo("");
        // setUrl("");
    }

    return (<div>
        Url: {url}
        <Image
            src={url}
            updateFile={updateFile}
            editing={true}
        />
        {/* <ModifyStatusUpdateImage
            imageUrl={url}
            updateImageUrl={updateImageUrl}
        /> */}
        <textarea
            value={memo}
            rows={5}
            cols={100}
            name="modifyStatusUpdateText"
            onInput={updateMemo}
            id={memoId ? memoId : "modify-status-update-memo"}
        />
        <button onClick={submitInfo}>Submit</button>
    </div>);
}