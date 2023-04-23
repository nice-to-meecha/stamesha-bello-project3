import React, { useContext } from "react";
import axios from "axios";
import ModifyStatusUpdate from "./ModifyStatusUpdate";
import { globalContext } from "./GlobalContext";

export default function CreateStatusUpdate(props) {
    const { refresh } = props;
    const { currUser } = useContext(globalContext);

    function postStatusUpdate(text, imageUrl) {
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
                    console.error(err);
                })
    }

    return (<div>
        <ModifyStatusUpdate
            imageUrl={""}
            text={""}
            submit={postStatusUpdate}
        />
    </div>);
}
