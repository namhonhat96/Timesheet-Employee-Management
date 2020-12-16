import React from "react";
import ReacDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import "./index.css";
<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>;

function HomePage() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

ReacDom.render(<HomePage />, document.getElementById("root"));
