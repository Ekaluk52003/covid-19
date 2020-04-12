import React, { Component } from 'react'
import "antd/dist/antd.css";
import { Layout } from "antd";

const { Footer } = Layout;

export class Foot extends Component {
    render() {
        return (
            <Footer style={{ textAlign: "center" }}>
            แบบประเมินความเสี่ยงการติดต่อของ Covid-19
            หน่วยงานความปลอดภัยอาชีวอนามัยและสิ่งแวดล้อม
          </Footer>
        )
    }
}

export default Foot;
