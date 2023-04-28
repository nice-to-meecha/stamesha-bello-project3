import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, BrowserRouter, Outlet } from "react-router-dom";
// import App from "./App";
import Navbar from "./view/Navbar";
import Feed from "./view/Feed";
import Error from "./view/Error";
import LoginAccount from "./view/LoginAccount";
import CreateAccount from "./view/CreateAccount";
import GlobalContext from "./view/GlobalContext";
import SearchResult from "./view/SearchResult";
import UserPage from "./view/UserPage";
import "./css/Global.css";
// import "./index.css";

const router = createBrowserRouter([
  {
      path: '/',
      element: (<div>
        <Navbar />
        <Error />
        <div className="outlet">
          <Outlet />
        </div>
      </div>),
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/login",
          element: <LoginAccount />
        },
        {
          path: "/signUp",
          element: <CreateAccount />,
        },
        {
          path: "/search",
          element: <SearchResult />,
        },
        {
          path: "/users/:username",
          element: <UserPage />,
        }
      ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContext>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GlobalContext>,
)
