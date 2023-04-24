import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { globalContext } from "./GlobalContext";

export default function Description(props) {
    const { description, submit } = props;
    const [memo, setMemo] = useState(description);
    const [editing, setEditing] = useState(false);
    let display = (<div></div>);
    const { username } = useParams();
    const { currUser } = useContext(globalContext);

    function updateMemo(event) {
        setMemo(event.target.value);
    }

    function updateDescription() {
        submit(memo);
        setEditing(false);
    }

    if (username !== currUser?.username) {
        display = (<div>Description: {description}</div>);

    } else if (editing) {
        display = (<div>
            <textarea
                value={memo}
                rows={3}
                cols={100}
                name="modifyStatusUpdateText"
                onInput={updateMemo}
            />
            <button onClick={updateDescription}>Update</button>
        </div>);

    } else {
        display = (<div>
            Description: {description}
            <button onClick={() => setEditing(true)}>Update Description</button>
        </div>
        );
    }

    return (<div>
        {display}       
    </div>);
}