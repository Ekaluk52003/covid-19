import React from "react";
import Tabletop from "tabletop";
import Headbar from "./Headbar";
import Foot from "./Foot";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { Layout, Statistic, Row, Col } from "antd";
import {
  LikeOutlined,
  SmileOutlined,
  ExclamationOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

class Graph extends React.Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      TotalState: 0,
      LowestRisk: 0,
      LowRisk: 0,
      HighRisk: 0,
      HighestRisk: 0,
    };
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData() {
    //innitial Tabletop fuction to load data from google sheet

    Tabletop.init({
      // google sheet ID from URL
      key: "1S-hSO-E8VPbC3eJodqa8P3LG8-F2BtLdKka0RMi6hmw",
      callback: (googleData) => {
        console.log(googleData);
        //restucture object array from googleData
        const TotalEntry = googleData.length;
        const filterLowestRisk = googleData.filter(
          (dataLabel) => dataLabel.meaning === "เสี่ยงน้อยมาก"
        ).length;
        const filterLowRisk = googleData.filter(
          (dataLabel) => dataLabel.meaning === "เสี่ยงน้อย"
        ).length;
        const filterHighRisk = googleData.filter(
          (dataLabel) => dataLabel.meaning === "เสี่ยง"
        ).length;
        const filterHighestRisk = googleData.filter(
          (dataLabel) => dataLabel.meaning === "เสี่ยงมาก"
        ).length;

        const data = [];
        data.push(
          filterLowestRisk,
          filterLowRisk,
          filterHighRisk,
          filterHighestRisk
        );

        console.log(data);
        this.setState({
          TotalState: TotalEntry,
          LowestRisk: filterLowestRisk,
          LowRisk: filterLowRisk,
          HighRisk: filterHighRisk,
          HighestRisk: filterHighestRisk,

          chartData: {
            labels: ["เสี่ยงน้อยมาก", "เสี่ยงน้อย", "เสี่ยง", "เสี่ยงมาก"],
            datasets: [
              {
                label: "ระดับความเสี่ยง",
                data: data,

                backgroundColor: ["#52c41a", "#fadb14", "#faad14", "#f5222d"],
                borderWidth: 5,
              },
            ],
          },
        });
      },
      //option of google sheet
      simpleSheet: true,
      order: "quarter",
    });
  }

  render() {
    return (
      <div>
        <Headbar />
        <Content
          className="site-layout"
          style={{
            padding: "0 20px",
            marginTop: 30,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          <h2 style={{ textAlign: "center" }}>ภาพรวมการประเมินผล</h2>
          <Doughnut
            data={this.state.chartData}
          />

          <Row gutter={16} style={{ marginBottom: 20 }}>
            <Col span={12}>
              <Statistic
                title="ความเสี่ยงน้อยมาก"
                value={this.state.LowestRisk}
                prefix={<SmileOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="ความเสี่ยงน้อย"
                value={this.state.LowRisk}
                prefix={<SmileOutlined />}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="มีความเสี่ยง"
                value={this.state.HighRisk}
                prefix={<CloseCircleOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="มีความเสี่ยงมาก"
                value={this.state.HighestRisk}
                prefix={<ExclamationOutlined />}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Statistic
                title="จำนวนผู้ประเมิณทั้งหมด"
                value={this.state.TotalState}
                prefix={<LikeOutlined />}
              />
            </Col>
          </Row>
        </Content>
        <Foot />
      </div>
    );
  }
}

export default Graph;
