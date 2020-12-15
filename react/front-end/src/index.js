import React from "react";
import ReacDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Summary from "./Summary";
import TimeSheet from "./Timesheet";
import Profile from "./Profile";
import "./index.css";
<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>;

function HomePage() {
  return (
    <Router>
      <div>
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
        </ul>

        <hr />

        <Switch>
          <Route exact path="/summary">
            <Summary />
          </Route>
          <Route path="/timesheet">
            <TimeSheet />
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
