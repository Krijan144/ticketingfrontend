import React, { useState, useEffect, useContext } from "react";
import { Tabs, Table, Tag, Modal } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import axios from "axios";
import { AuthContext } from "../contextapi/authContext";
const { TabPane } = Tabs;

const Button = () => {
  const [fquery, setFQuery] = useState([]);
  const [user, setUser] = useContext(AuthContext).uso;
  const [data, setData] = useState([]);
  const [type, setType] = useState([]);
  const [answer, setAnswer] = useState();
  const [visible, setVisible] = useState(false);
  const userID = user.user.id;
  const columns = [
    {
      title: "Query",
      dataIndex: "query",

      width: "70%",
    },
    {
      title: "Type",
      dataIndex: "q_type",

      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (text, record) => (
        <Tag
          onClick={() => {
            handleClick(record._id);
          }}
        >
          Detail
        </Tag>
      ),
    },
  ];
  useEffect(() => {
    console.log(user);
    const id = userID;
    const token = user.token;
    axios
      .get(`http://localhost:8000/api/query/falsequery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        const query = res.data.data;
        setFQuery(query);
      });
    axios.get(`http://localhost:8000/api/query/truequery/${id}`).then((res) => {
      console.log(res.data);
      setData(res.data.data);
      //   const ansd_query = res.data.data;
      //   this.setState({ ansd_query });
    });

    axios.get(`http://localhost:8000/api/query/q_role/`).then((res) => {
      console.log(res.data);
      setType(res.data);
      //   const ansd_query = res.data.data;
      //   this.setState({ ansd_query });
    });
  }, []);
  const handleClick = (e) => {
    console.log(e);
    axios.get(`http://localhost:8000/api/answer/${e}`).then((res) => {
      console.log(res.data, "hello");
      setAnswer(res.data);
      setVisible(true);
    });
  };
  return (
    <div className="container my-4">
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              Pending
            </span>
          }
          key="1"
        >
          <Modal
            title="Details"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
            footer={[]}
          >
            <p>
              <b>Query: </b>

              {fquery.query}
            </p>
            <p>
              <b>Ellaborate</b>
              <br />
              {fquery.ellaborate}
            </p>
            <p>
              <b>Answer:</b>
              <br />
              {answer?.answer}
            </p>

            <p>
              <b>Answered by:</b>
            </p>
          </Modal>
          {/* {fquery.map((list) => {
            return <p>{list.query}</p>;
          })} */}
          <Table
            columns={columns}
            // expandable={{
            //   expandedRowRender: (record) => (
            //     <p style={{ margin: 0 }}>{record.ellaborate}</p>
            //   ),
            // }}
            dataSource={fquery}
            //onChange={this.handleTableChange}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              Answered
            </span>
          }
          key="2"
        >
          <Table
            columns={columns}
            // expandable={{
            //   expandedRowRender: (record) => (
            //     <p style={{ margin: 0 }}>{record.ellaborate}</p>
            //   ),
            // }}
            dataSource={data}
            //onChange={this.handleTableChange}
          />
        </TabPane>
      </Tabs>
      <Modal
        title="Details"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={[]}
      >
        <p>
          <b>Query: </b>

          {data.query}
        </p>
        <p>
          <b>Ellaborate</b>
          <br />
          {data.ellaborate}
        </p>
        <p>
          <b>Answer:</b>
          <br />
          {answer?.answer}
        </p>

        <p>
          <b>Answered by:</b>
        </p>
      </Modal>
      ,
    </div>
  );
};

export default Button;
