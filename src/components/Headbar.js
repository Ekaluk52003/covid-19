import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Layout, Menu, Input, Select, PageHeader } from "antd";
import { Link } from "react-router-dom";
import { AreaChartOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export class Headbar extends Component {
  render() {
    return (
      <div>
        <Header>
          <img
            src="/images/logo512.png"
            style={{
              float: "left",
              height: 40,
              marginTop: 10,
              marginRight: 10,
            }}
          />

          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">PRECISE</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/Graph">
                <AreaChartOutlined
                  style={{
                    fontSize: 25,
                  }}
                />
                Graph
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
      </div>
    );
  }
}

export default Headbar;
