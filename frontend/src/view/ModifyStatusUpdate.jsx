import React, { useState } from "react";
import ModifyStatusUpdateImage from "./ModifyStatusUpdateImage";

export default function ModifyStatusUpdate(props) {
    const { imageUrl, text, submit, memoId } = props;
    const [url, setUrl] = useState(imageUrl);
    const [memo, setMemo] = useState(text);

    function updateMemo(event) {
        setMemo(event.target.value);
    }

    function updateImageUrl(event) {
        setUrl(event.target.value);
    }

    function submitInfo() {
        setMemo("");
        setUrl("");
        submit(memo, url);
    }

    return (<div>
        <ModifyStatusUpdateImage
            imageUrl={url}
            updateImageUrl={updateImageUrl}
        />
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