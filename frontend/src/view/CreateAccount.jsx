import React, { useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AccountInput, { AccountAction } from "./AccountInput";
import { globalContext } from "./GlobalContext";

// TODO - Should users be able to create an account or log in,
// if they're already logged in, if they venture to the login/signUp urls?
export default function CreateAccount(props) {
    const globalValues = useContext(globalContext);
    const { setCurrUser } = globalValues;
    const navigate = useNavigate();

    async function createAccount(username, password) {
        axios.post("/api/users/", { username, password })
            .then(data => {
                console.log(data);
                setCurrUser(data.data);
                navigate('/');
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (<div>
        <AccountInput
            accountAction={AccountAction.SignUp.name}
            submit={createAccount}
        />
    </div>);
}