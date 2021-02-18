import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Popconfirm, PageHeader } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Joe Black",
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Jim Green",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
// ];

class antcustomer extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [],
    refresh: false,
  };

  componentDidMount() {
    axios.get("http://localhost:8000/users/user").then((res) => {
      console.log(res.data);
      this.setState({ data: res.data });
      //   const ansd_query = res.data.data;
      //   this.setState({ ansd_query });
    });
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  handleDelete = (e) => {
    console.log(e);

    axios({
      url: "http://localhost:8000/users/deluser",
      method: "DELETE",
      data: {
        id: `${e}`,
      },
    }).then(() => {
      console.log("deleted");
      this.setState({ refresh: true });
    });
  };

  render() {
    const columns = [
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "30%",
        ...this.getColumnSearchProps("email"),
      },
      {
        title: "Username",
        dataIndex: "fullname",
        key: "fullname",
        width: "20%",
        ...this.getColumnSearchProps("fullname"),
      },

      {
        title: "Action",
        key: "action",
        dataIndex: "_id",
        width: "20%",

        render: (text, record) => (
          <Space size="middle">
            <Popconfirm
              title="Are you sure you want to delete?"
              onConfirm={() => {
                this.handleDelete(record._id);
              }}
            >
              <DeleteOutlined />
            </Popconfirm>
          </Space>
        ),
      },
    ];
    return (
      <div className="container p-4">
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="All Users"
        />
        <Table columns={columns} dataSource={this.state.data} />
      </div>
    );
    //dataSource = { data };
  }
}
export default antcustomer;
