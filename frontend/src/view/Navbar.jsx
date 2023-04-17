import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { globalContext } from "./GlobalContext";
import axios from "axios";
import "../css/Navbar.css";

export default function Navbar(props) {
    const [ query, setQuery ] = useState("");
    const [ loginLogoutButtons, setLoginLogoutButtons ] = useState((<></>));
    const globalValues = useContext(globalContext);

    function updateQuery(event) {
        setQuery(event.target.value);
    }

    function logOut() {
        axios.post("/api/users/logout")
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        if (!globalValues.currUser) {
            setLoginLogoutButtons((<div>
                {/* TODO - Replace with either <Link> or <button> */}
                <button><Link to="/logIn">Log In</Link></button>
                <button><Link to="/signUp">Sign Up</Link></button>
            </div>))
        } else {
            setLoginLogoutButtons(<div>
                <button onClick={logOut}>Log Out</button>
            </div>)
        }
    }, [globalValues.currUser]);

    return (<div>
        <Link to="/" className="home-link">Tweeter</Link>
        {loginLogoutButtons}
        <input className="search-bar" value={query} onInput={updateQuery}/>
    </div>);
}
