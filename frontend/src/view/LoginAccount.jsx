import React, { useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AccountInput, { AccountAction } from "./AccountInput";
import { globalContext } from "./GlobalContext";
import { formatErrorMessage } from "../commonUtilities";

export default function LoginAccount(props) {

    const globalValues = useContext(globalContext);
    const { setCurrUser, setError } = globalValues;
    const navigate = useNavigate();

    function login(username, password) {
        axios.post("/api/users/login", { username, password })
            .then(data => {
                console.log(data);
                setCurrUser(data.data);
            })
            .then(data => {
                navigate('/');
            })
            .catch(err => {
                setError(formatErrorMessage(err.response?.data || ""));
                console.error(err);
            })
    }
    return (<div>
        <AccountInput
            submit={login}
            accountAction={AccountAction.Login.name}
        />
    </div>);
}