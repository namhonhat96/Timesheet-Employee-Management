import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const testUser = {
      email: email,
      password: password,
    };

    axios
      .post(`http://localhost:8081/login/authenticate`, testUser)
      .then((res) => {
        const user = res.data;
        localStorage.setItem("userID", user.id);
        localStorage.setItem("weekEnding", "12/26/2020"); //use it for now
        window.location = "/home";
      });

    //
  }

  return (
    <div className="Login">
      <h3 className="container">Login Form</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="10px" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="10px" controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
