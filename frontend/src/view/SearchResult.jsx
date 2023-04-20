import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import UserLink from "./UserLink";

export default function SearchResult(props) {
    const [ matchingUsers, setMatchingUsers ] = useState([]);

    const [urlSearchParams, setUrlSearchParams] = useSearchParams();
    const query = urlSearchParams.get("query");

    function createUserList(users) {
        return users.map(({ username, userImage }, i) => (
            <UserLink
                username={username}
                userImage={userImage}
                key={i}
            />
        ));
    }

    useEffect(async () => {
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
            console.error(err);
        })
    }, []);

    return (<div>
        { matchingUsers?.length ? matchingUsers : "No existing users match the search..."}
    </div>);
}