import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { AuthContext } from "../contextapi/authContext";
import { useHistory, Link } from "react-router-dom";
import "./css/login.css";

const Role = (props) => {
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [qrole, setQrole] = useState([]);

  // const [isAdmin, setIsAdmin] = useContext(AuthContext).is_admin;

  const [user, setUser] = useContext(AuthContext).uso;
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:8000/api/query/q_role/").then((res) => {
      console.log(res);
      setQrole(res.data);
    });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      url: "http://localhost:8000/api/query/q_role/",
      method: "POST",
      data: { role },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // setIsAdmin(user.user?.role === 'admin')

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
          <Alert variant="success">Success! New role admitted</Alert>
        )}

        <h3 className="text-center my-5">Enter New Role</h3>
        <div className="row">
          <div className="col-sm">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter New Role"
                  name="email"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </Form.Group>
              {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group> */}
              <br /> <br />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="col-sm">
            <h4>Registered role</h4>
            {qrole.map((list) => {
              return <ol>{list.role}</ol>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
