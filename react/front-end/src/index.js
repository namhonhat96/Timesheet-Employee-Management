import React from "react";
import ReacDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import Home from "./Home";
import "./index.css";
<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>;

function HomePage() {
  let currentURl = window.location.href;
  let isLogin = null;
  if (currentURl === "http://localhost:3000/") {
    isLogin = false;
  } else {
    isLogin = true;
  }

  function logOutUser(e) {
    localStorage.clear();
    window.location = "/";
  }

  return (
    <Router>
      <div>
        {isLogin ? (
          <ul>
            <li>
              <Link to="/summary">Summary</Link>
            </li>
            <li>
              <Link to="/timesheet">TimeSheet</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <button className="logout_button" onClick={logOutUser}>
              Log out
            </button>
          </ul>
        ) : (
          ""
        )}

        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/summary">
            <Summary />
          </Route>
          <Route path="/timesheet">
            <TimeSheet />
          </Route>
          <Route path="/view">
            <ViewTimesheet />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReacDom.render(<HomePage />, document.getElementById("root"));
