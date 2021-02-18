import React from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Popconfirm,
  PageHeader,
  Tag,
  Modal,
} from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  DeleteOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import axios from "axios";

class antticket extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [],
    visible: false,
    detail: {},
  };
  componentDidMount() {
    axios.get("http://localhost:8000/api/query/").then((res) => {
      console.log(res.data);
      this.setState({ data: res.data.data });
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
  handleTableChange = (filters) => {
    console.log(filters);
  };
  handleDelete = (e) => {
    console.log(e);
    axios({
      url: "http://localhost:8000/api/query/delquery",
      method: "DELETE",
      data: {
        id: `${e}`,
      },
    }).then((res) => {
      console.log("deleted");
    });
  };

  render() {
    console.log(this.state.detail);
    const columns = [
      {
        title: "Query",
        dataIndex: "query",
        key: "query",
        width: "50%",
        ...this.getColumnSearchProps("query"),
      },
      {
        title: "Answer Status",
        dataIndex: "is_answered",
        key: "is_answered",
        width: "20%",
        filters: [
          { text: "True", value: "true" },
          { text: "False", value: "false" },
        ],
        onFilter: (value, record) => record.is_answered.indexOf(value) === 0,

        // ...this.getColumnSearchProps("is_answered"),
      },
      {
        title: "Action",
        key: "action",
        width: "20%",
        render: (text, record) => (
          <Space size="middle">
            <Popconfirm
              title="Are you sure you want to delete?"
              onConfirm={() => {
                // console.log(record._id);

                this.handleDelete(record._id);
              }}
            >
              <DeleteOutlined style={{ color: "#8b0000" }} />
            </Popconfirm>
            <Tag
              onClick={() => {
                console.log(record);
                this.setState({ visible: true });
                this.setState({ detail: record });
              }}
            >
              Detail
            </Tag>
          </Space>
        ),
      },
    ];
    return (
      <div className="container p-4">
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Tickets"
        />
        <Table
          columns={columns}
          // expandable={{
          //   expandedRowRender: (record) => (
          //     <p style={{ margin: 0 }}>{record.ellaborate}</p>
          //   ),
          // }}
          dataSource={this.state.data}
          onChange={this.handleTableChange}
        />
        <Modal
          title="Details"
          centered
          visible={this.state.visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
          width={1000}
          footer={[]}
        >
          <p>
            <b>Query: </b>

            {this.state.detail.query}
          </p>

          <p>
            <b>Desciption:</b>
            <br />
            {this.state.detail.ellaborate}
          </p>
          <p>
            <b>Asked by:</b>
          </p>
          <p>
            <b>Answered by:</b>
          </p>
        </Modal>
      </div>
    );
    //dataSource = { data };
  }
}
export default antticket;
