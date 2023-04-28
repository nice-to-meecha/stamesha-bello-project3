import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { globalContext } from "./GlobalContext";
import { BsPencilSquare } from "react-icons/bs";
import "../css/Description.css";

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
        display = (<div>{description}</div>);

    } else if (editing) {
        display = (<div className="edit-description">
            <textarea
                className="edit-description-memo"
                value={memo}
                name="modifyStatusUpdateText"
                onInput={updateMemo}
            />
            <button
                className="edit-description-submit-button"
                onClick={updateDescription}
            >
                Update
            </button>
        </div>);

    } else {
        display = (<div className="static-description">
            <BsPencilSquare
                className="edit-description-icon"
                onClick={() => setEditing(true)}
            />
            &nbsp; {description}
        </div>
        );
    }

    return (<div>
        {display}       
    </div>);
}