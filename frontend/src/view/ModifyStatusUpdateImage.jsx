import React from "react";

export default function ModifyStatusUpdateImage(props) {
    const { imageUrl, updateImageUrl } = props;

    function check(event) {
        console.log(event);
    }
    
    return (<div>
        <input type="file" onInput={check} />
    </div>);
}