import React, { useEffect, useState } from "react";
import { Drawer, Button, Form, Col, Row, Input, Select, Space } from "antd";
import axios from "axios";
import {
  MinusCircleOutlined,
  PlusOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import "antd/dist/antd.css";

const { Option } = Select;
const Antrole = () => {
  const [state, setState] = useState({ visible: false, childrenDrawer: false });
  const [qrole, setRole] = useState([]);
  const [role, setRoles] = useState([]);
  const [refresh, setRefresh] = useState(false);
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
  const onFinish = (e) => {
    console.log(e.users);
    axios({
      url: "http://localhost:8000/api/query/q_role/",
      method: "POST",
      data: e.users,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(setRefresh(true));
  };
  const handleDelete = (e) => {
    console.log(e, "delete");
    axios({
      url: "http://localhost:8000/api/query/q_role",
      method: "DELETE",
      data: {
        role: e,
      },
    }).then(setRefresh(true));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/query/q_role`)
      .then((res) => {
        setRole(res.data);
      })
      .then(setRefresh(false));
  }, [refresh]);
  return (
    <div>
      <Button type="primary" onClick={showDrawer} style={{ height: "60px" }}>
        <PlusOutlined theme="outlined" />
        Agent Roles
      </Button>
      <Drawer
        title="Roles"
        width={520}
        closable={false}
        onClose={onClose}
        visible={state.visible}
      >
        {qrole.map((list) => {
          return (
            <>
              <p>
                {list.role}
                <DeleteFilled
                  className="float-right"
                  onClick={() => {
                    handleDelete(list.role);
                  }}
                />
              </p>
            </>
          );
        })}
        <br />

        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "role"]}
                      fieldKey={[field.fieldKey, "role"]}

                      // onChange={(e) => {
                      //   console.log(e.target.value);
                      //   setRoles(e.target.value);
                      // }}

                      // rules={[{ required: true, message: "Missing last name" }]}
                    >
                      <Input placeholder="Add Role Type" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Roles
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Antrole;
