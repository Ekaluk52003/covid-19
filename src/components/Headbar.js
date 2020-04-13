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
              height: 25,
              marginTop: 20,
            }}
          />

          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">PRECISE</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/Graph">
                <AreaChartOutlined
                  
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
