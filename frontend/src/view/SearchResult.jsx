import React, { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import UserLink from "./UserLink";
import { globalContext } from "./GlobalContext";
import { formatErrorMessage } from "../commonUtilities";
import "../css/SearchResult.css";

export default function SearchResult(props) {
    const [ matchingUsers, setMatchingUsers ] = useState([]);

    const [urlSearchParams, setUrlSearchParams] = useSearchParams();
    const query = urlSearchParams.get("query");

    const { setError } = useContext(globalContext);

    function createUserList(users) {
        return users.map(({ username, userImage }, i) => (
            <UserLink
                className="user-link-in-list"
                username={username}
                userImage={userImage}
                key={i}
            />
        ));
    }

    useEffect(() => {
        axios.get("/api/users/")
        .then(data => {
            if (query) {
                const searchRegex = new RegExp(query, "i");
                setMatchingUsers([...createUserList(data.data.filter(user => searchRegex.test(user.username)))])

            } else {
                setMatchingUsers([...createUserList(data.data)]);
            }
        })
        .catch(err => {
            setError(formatErrorMessage(err.response?.data || ""));
            console.error(err);
        })
    }, [urlSearchParams]);

    return (<div className="search-result-container">
        <div className="search-result">
            { matchingUsers?.length ? matchingUsers : "No existing users match the search..."}
        </div>
    </div>);
}