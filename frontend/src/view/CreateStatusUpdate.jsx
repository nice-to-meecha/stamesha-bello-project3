import React, { useContext } from "react";
import axios from "axios";
import ModifyStatusUpdate from "./ModifyStatusUpdate";
import { globalContext } from "./GlobalContext";
import { formatErrorMessage } from "../commonUtilities";

export default function CreateStatusUpdate(props) {
    const { refresh } = props;
    const { currUser, setError } = useContext(globalContext);
    const memoId = "create-status-update-memo";

    function postStatusUpdate(text, imageUrl) {
        console.log("Post text:", text, "url", imageUrl);
        axios.post(
            "/api/statusUpdates",
            { username: currUser.username || '', text, imageUrl }
            )
                .then(data => {
                    console.log(data);
                })
                .then(() => {
                    refresh();
                })
                .catch(err => {
                    setError(formatErrorMessage(err.response?.data || ""));
                    console.error(err);
                })
    }

    return (<div>
        <ModifyStatusUpdate
            imageUrl={""}
            text={""}
            submit={postStatusUpdate}
            memoId={memoId}
        />
    </div>);
}
