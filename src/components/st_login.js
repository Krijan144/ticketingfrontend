import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { AuthContext } from "../contextapi/authContext";
import { useHistory, Link } from "react-router-dom";
import "./css/login.css";

const St_login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [q_role, setQRole] = useState([]);
  const [role, setRole] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [isLoggedin, setIsLoggedin] = useContext(AuthContext).login;
  // const [isAdmin, setIsAdmin] = useContext(AuthContext).is_admin;

  const [user, setUser] = useContext(AuthContext).uso;
  let history = useHistory();
  useEffect(() => {
    axios.get(`http://localhost:8000/api/query/q_role`).then((res) => {
      console.log(res.data, "ok");
      setQRole(res.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      url: "http://localhost:8000/users/st_login/",
      method: "POST",
      data: { email, password, role },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response, "response from login");
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser({
          token: localStorage.getItem("token"),
          user: JSON.parse(localStorage.getItem("user")),
        });
        // setIsAdmin(user.user?.role === 'admin')
        setIsLoggedin(true);
        setSubmitted(true);
        setShow(false);
        history.push("/");
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setShow(true);
        setError(err.response.data.msg);
      });
  };

  return (
    <div className="container p-5 mt-5">
      <div className="col-lg-5 offset-md-4 login mt-5">
        {show ? <Alert variant="danger">{error}</Alert> : null}
        {submitted && (
          <Alert variant="success">Success! You are logged in.</Alert>
        )}

        <h3 className="text-center my-5">STAFF LOGIN</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Type</Form.Label>
            <Form.Control
              as="select"
              name="q_type"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {/* <option selected>Open this select type</option> */}
              {q_role.map((list) => {
                return <option id={list.id}>{list.role}</option>;
              })}
              {/* <option></option> */}
            </Form.Control>
          </Form.Group>
          {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group> */}

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default St_login;
