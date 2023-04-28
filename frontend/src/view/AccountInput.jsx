import React, { useContext, useState } from "react";
import { globalContext } from "./GlobalContext";
import "../css/AccountInput.css";

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

    return (<div className="account-input">
        <div className="username-password-inputs">
            <div className="username-input-unit">
                <label htmlFor="username-input">
                    Username:&nbsp;
                </label>
                <input
                    id="username-input"
                    value={username}
                    onInput={updateUsername}
                    type="text"
                />
            </div>
            <div className="password-input-unit">
                <label htmlFor="password-input">
                    Password:&nbsp;
                </label>
                <input
                    id="password-input"
                    value={password}
                    onInput={updatePassword}
                    type="password"
                />
            </div>
        </div>
        <button
            className="account-input-submit-button tweeter-button"
            onClick={() => submit(username, password)}
        >
            {accountAction}
        </button>
    </div>);
}