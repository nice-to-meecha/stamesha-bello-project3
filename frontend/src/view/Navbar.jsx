import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { globalContext } from "./GlobalContext";
import axios from "axios";
import "../css/Navbar.css";

export default function Navbar(props) {
    const [ query, setQuery ] = useState("");
    const [ loginLogoutButtons, setLoginLogoutButtons ] = useState((<></>));
    const globalValues = useContext(globalContext);
    const { currUser, setCurrUser } = globalValues;
    const navigate = useNavigate();

    function updateQuery(event) {
        setQuery(event.target.value);
    }

    function logOut() {
        axios.post("/api/users/logout")
            .then(data => {
                console.log(data);
                setCurrUser(undefined);
                navigate('/');
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        axios.get("/api/users/isLoggedIn")
            .then(data => {
                console.log("Is Logged In", data);
                if (data.data.userId) {
                    axios.get(`/api/users/${data.data.userId}`)
                    .then(userData => {
                        setCurrUser(userData.data);
                        console.log("Curr User", userData);
                    })
                    .catch(err => {
                        console.error(err);
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (!currUser) {
            setLoginLogoutButtons((<div>
                {/* TODO - Replace with either <Link> or <button> */}
                <button><Link to="/logIn">Log In</Link></button>
                <button><Link to="/signUp">Sign Up</Link></button>
            </div>))
        } else {
            setLoginLogoutButtons(<div>
                Hey, {currUser.username}. <button onClick={logOut}>Log Out</button>
            </div>)
        }
    }, [globalValues.currUser]);

    return (<div>
        <Link to="/" className="home-link">Tweeter</Link>
        {loginLogoutButtons}
        <input className="search-bar" value={query} onInput={updateQuery} type="search" />
    </div>);
}
