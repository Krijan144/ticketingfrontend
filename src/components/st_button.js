import axios from "axios";
import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { Drawer, Form, Button, Col, Row, Input, Select, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Antrole from "./antrole";
import "antd/dist/antd.css";
const { Option } = Select;
const St_button = () => {
  const [state, setState] = useState({ visible: false });
  const [dtrue, setTrue] = useState([]);
  const [dfalse, setFalse] = useState([]);
  const [qrole, setRole] = useState([]);
  const [Qrole, setQRole] = useState([]);
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordcheck] = useState();
  const [role, setRole2] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/query/true`).then((res) => {
      setTrue(res.data.data.length);
    });
    axios.get(`http://localhost:8000/api/query/false`).then((res) => {
      setFalse(res.data.data.length);
    });
    axios.get(`http://localhost:8000/api/query/q_role`).then((res) => {
      setRole(res.data);
    });
    axios.get(`http://localhost:8000/api/query`).then((res) => {
      console.log(res);
      setQRole(res.data.data);
      console.log(res.data.data[49], "data question");
    });
  }, []);

  const handleButton1 = () => {
    window.location.href = "/st_answeredlist";
  };
  const handleButton2 = () => {
    window.location.href = "/st_querylist";
  };
  //antdesign
  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const onClose = () => {
    setState({
      visible: false,
    });
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
  };

  const onFinish = (e) => {
    console.log(role, "1");
    console.log(fullname);
    console.log(email);
    console.log(password);
    console.log(passwordCheck);

    axios({
      url: "http://localhost:8000/users/stregister",
      method: "POST",
      data: { email, password, passwordCheck, fullname, role },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setSubmitted(true);
        setShow(false);
      })
      .catch((err) => {
        setShow(show == true);
        console.log(err.response.data.msg);

        setShow(true);
        setError(err.response.data.msg);
        console.log(show);
      });
  };

  //antdesign

  const doughnut = {
    data: {
      labels: ["Answered", "Not Answered"],

      datasets: [
        {
          backgroundColor: ["#5cb85c", "#d9534f"],
          data: [dtrue, dfalse],
        },
      ],
    },
    options: {
      legend: {
        labels: {
          // fontColor: "white",
        },
      },
    },
  };
  const dynamic = qrole.map((list) => {
    return list.role;
  });
  const time = Qrole.map((list) => {
    return list.date;
  });
  const type = Qrole.map((list) => {
    // console.log(list, "list");
    return list.q_type;
  });

  var counts = {};
  type.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  const Dynamic = counts.dynamic;
  const Technical = counts.Technical;
  const Management = counts.Management;
  const Cleanup = counts.Cleanup;
  const Refunds = counts.Refunds;
  // const undefined = counts.undefined;
  // console.log(counts.Management);
  // const data = Qrole.map(list);
  const bar = {
    data: {
      labels: dynamic,

      datasets: [
        {
          label: [dynamic],
          backgroundColor: ["white", "#36a2eb", "#eb1796", "green"],

          data: [Refunds, Management, Cleanup, Technical],
        },
      ],
    },
    options: {
      legend: {
        // fontColor: "white",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              //fontColor: "white",
            },
          },
        ],
      },
    },
  };
  const line = {
    labels: ["a"],
    datasets: [
      {
        backgroundColor: ["white", "#36a2eb", "#eb1796", "green"],

        data: time,
      },
    ],

    options: {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            type: "time",
            time: {
              parser: "YYYY-MM-DDTHH:mm:ss.458Z",
              unit: "minute",
              displayFormats: {
                minute: "YYYY-MM-DDTHH:mm:ss.458Z",
                hour: "YYYY-MM-DD HH:mm:ss",
              },
            },
            ticks: {
              source: time,
            },
          },
        ],
      },
    },
  };

  // qrole.map((list) => {
  //   console.log(list);
  //   setQRole(list);
  // });

  return (
    <div className="container p-5">
      <div className="text-center my-3" style={{ color: "white" }}>
        <h2>Controller</h2>
      </div>
      <div className="row">
        <div className="col-sm" style={{ width: "100px" }}>
          <Doughnut data={doughnut.data} options={doughnut.options} />
        </div>

        <div className="col-sm" style={{ width: "100px" }}>
          <Bar data={bar.data} options={bar.options} />
        </div>
      </div>
      <br />
      <br />
      <div style={{ height: "250px" }}>
        <Line data={line} options={line.options} />
      </div>
      <div className="text-center my-5">
        <br />
        <br />
        <div className="row justify-content-md-center">
          <div className="col col-lg-2">
            <Antrole />
          </div>
          <div className="col col-lg-2">
            <Button
              type="primary"
              style={{ height: "60px" }}
              onClick={showDrawer}
            >
              <PlusOutlined theme="outlined" /> New Agent
            </Button>
          </div>
        </div>

        <br />

        {/* ant design */}

        <Drawer
          title="Create a new agent account"
          width={650}
          onClose={onClose}
          visible={state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
            </div>
          }
        >
          {show ? (
            // <Alert description={error} type="error" showIcon closable />
            <Alert type="error" message={error} banner />
          ) : null}
          {submitted && (
            // <Alert description={error} type="error" showIcon closable />
            <Alert
              type="success"
              message="Agent successfully registered"
              banner
            />
          )}
          <Form
            layout="vertical"
            hideRequiredMark
            validateMessages={validateMessages}
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  rules={[
                    {
                      required: true,
                      type: "email",
                    },
                  ]}
                >
                  <Input placeholder="Please enter email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="fullname"
                  label="UserName"
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Please enter username" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true, message: "Please select a Role" }]}
                >
                  <Select
                    onChange={(e) => {
                      console.log(e);
                      setRole2(e);
                    }}
                    placeholder="Please select a agent role"
                  >
                    {qrole.map((list) => {
                      return (
                        <Option value={list.role} id={list.id}>
                          {list.role}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  onChange={(e) => {
                    console.log(e);
                    setPassword(e.target.value);
                  }}
                  rules={[{ required: true, message: "Please enter password" }]}
                >
                  <Input placeholder="Please enter password" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="re-password"
                  label="Re-type Password"
                  onChange={(e) => {
                    setPasswordcheck(e.target.value);
                  }}
                  rules={[{ required: true, message: "Re-type Password" }]}
                >
                  <Input placeholder="Re-type Password" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="Approver"
                  rules={[
                    { required: true, message: "Please choose the approver" },
                  ]}
                >
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Drawer>
        {/* Ant design */}
        <br />
        <br />
        <Button variant="success" onClick={handleButton1}>
          Answered Query
        </Button>
        {"  "}
        <Button variant="danger" onClick={handleButton2}>
          To be answered
        </Button>
      </div>
      <div className="text-center my-5">
        {/* <Link to="/st_register">
          <Button variant="success">Staff Register</Button>
        </Link>
      </div>
      <div className="text-center my-5">
        <Link to="/st_role">
          <Button variant="success">Add Role</Button>
        </Link> */}
      </div>
    </div>
  );
};

export default St_button;
