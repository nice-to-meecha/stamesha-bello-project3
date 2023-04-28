import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useLocation, useNavigate, useParams } from "react-router";
import { globalContext } from "./GlobalContext";
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";
import axios from "axios";
import "../css/Navbar.css";

export default function Navbar(props) {
    const [ query, setQuery ] = useState("");
    const [ loginLogoutButtons, setLoginLogoutButtons ] = useState((<></>));
    const globalValues = useContext(globalContext);
    const { currUser, setCurrUser } = globalValues;
    const { username: usernameParam } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [ currentAccountPage, setCurrentAccountPage ] = useState(pathname);

    function updateQuery(event) {
        setQuery(event.target.value);
    }

    function search() {
        navigate(`/search${query ? `?query=${query}` : ""}`);
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

    function createEntry() {
        let path = '/';
        if (usernameParam) {
            path = `/users/${usernameParam}`;
        }

        return `${path}#create-status-update-memo`;
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
            setLoginLogoutButtons((<div className="login-logout-buttons login-buttons">
                <Link
                    id="navbar-login-link"
                    className={
                        (pathname ?? "").endsWith("logIn")
                            ? "login-signup-link indicate-current-page"
                            : "login-signup-link"
                    }
                    to="/logIn"
                >
                    Log In
                </Link>
                <Link
                    id="navbar-signup-link"
                    className={
                        (pathname ?? "").endsWith("signUp")
                            ? "login-signup-link indicate-current-page"
                            : "login-signup-link"
                    }
                    to="/signUp"
                >
                    Sign Up
                </Link>
            </div>))
        } else {
            setLoginLogoutButtons(<div className="login-logout-buttons">
                <div className="drop-down-menu-button">
                    {currUser.username}
                    <div className="drop-down-menu">
                        <HashLink to={createEntry()}>Create Entry</HashLink>
                        <button onClick={logOut}>Log Out</button>
                    </div>
                </div>
            </div>)
        }
    }, [globalValues.currUser, pathname]);

    return (<div className="navbar">
        <div className="home-button">
            <Link to="/" className="home-link">Tweeter</Link>
        </div>
        <div className="navbar-options">
            <div className="search-unit">
                <input className="search-bar" value={query} onInput={updateQuery} type="search" />
                {/* TODO - Replace with magnifying glass or other search icon */}
                <HiOutlineMagnifyingGlassCircle
                    className="search-submit-icon"
                    onClick={search}
                />
            </div>
            {loginLogoutButtons}
        </div>
    </div>);
}
