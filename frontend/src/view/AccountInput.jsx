import React, { useContext, useState } from "react";
import { globalContext } from "./GlobalContext";

export class AccountAction {
    static SignUp = new AccountAction("Sign Up");
    static Login = new AccountAction("Login");

    constructor(name) {
        this.name = name;
    }
}

export default function AccountInput(props) {
    const { accountAction, submit } = props;

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const { currUser } = useContext(globalContext);

    function updateUsername(event) {
        setUsername(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    if (currUser) {
        return (<div>You're already {accountAction === "Sign Up" ? "signed up" : "logged in"}</div>);
    }

    return (<div>
        <div>
            Username: <input value={username} onInput={updateUsername} type="text" />
        </div>
        <div>
            Password: <input value={password} onInput={updatePassword} type="password" />
        </div>
        <button onClick={() => submit(username, password)}>{accountAction}</button>
    </div>);
}