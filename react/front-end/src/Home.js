import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Summary from "./Summary";
import TimeSheet from "./Timesheet";
import Profile from "./Profile";
import Login from "./login";
import ViewTimesheet from "./ViewTimesheet";

export default function Home() {
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
          <li>
            <Link to="/logout">Log Out</Link>
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
          <Route path="/timesheet/view">
            <ViewTimesheet />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/logout">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
