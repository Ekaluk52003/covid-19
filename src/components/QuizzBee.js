import React, { Component } from "react";
import ReactDOM from "react-dom";
import Fade from "react-reveal/Fade";
import "antd/dist/antd.css";
import quizService from "../quizService";
import QuestionBox from "./QuestionBox";
import Analysis from "./Analysis";
import Headbar from "./Headbar";
import Foot from "./Foot";
import { Button, Layout, Menu, Input, Select, PageHeader } from "antd";
import {
  FundOutlined,
  CloseOutlined,
  CheckOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Content } = Layout;

class QuizzBee extends Component {
  state = {
    questionBank: [],
    score: 0,
    response: 0,
    username: null,
    start: false,
    thankYou: false,
    CompanyName: null,
    meaning: null,
    hideBox: false,
    showBtn: true,
    result: false,
  };

  getStart = () => {
    this.setState({
      start: true,
    });
    window.scrollTo(0, 0);
  };

  showResult = () => {
    this.setState({ result: true });
    this.setState({ showBtn: false });
    this.setState({ hideBox: true });
  };

  reset = () => {
    this.getQuestion();
    this.setState({
      // start: true,
      hideBox: false,
      score: 0,
      response: 0,
    });
  };

  handleSelect = (value) => {
    this.setState({
      CompanyName: value.label,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getQuestion = () => {
    quizService().then((question) => {
      this.setState({
        questionBank: question,
      });
    });
  };

  scrollTop = () => {
    if (this.state.response === 7) {
      window.scrollTo(0, 0);
    }
  };

  computeAnswer = (answer, correctAnswer, Id) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 5,
      });
    }
    //Translate Score
    if (this.state.score < 8) {
      this.setState({
        meaning: "เสี่ยงน้อยมาก",
      });
    }
    if (this.state.score > 7 && this.state.score < 12) {
      this.setState({
        meaning: "เสี่ยงน้อย",
      });
    }
    if (this.state.score > 11 && this.state.score < 20) {
      this.setState({
        meaning: "เสี่ยง",
      });
    }
    if (this.state.score > 19) {
      this.setState({
        meaning: "เสี่ยงมาก",
      });
    }
    // end //Translate Score

    if (answer !== correctAnswer) {
      this.setState({
        score: this.state.score + 1,
      });
    }

    this.setState({
      response: this.state.response < 7 ? this.state.response + 1 : 7,
    });
    if (this.state.response === 7) {
      window.scrollTo(0, 0);
    }
  };

  confirmData = () => {
    const data = [
      {
        username: this.state.username,
        score: this.state.score,
        CompanyName: this.state.CompanyName,
        meaning: this.state.meaning,

        "Created at": new Date(new Date().getTime() + 7 * 3600 * 1000)
          .toUTCString()
          .replace(/ GMT$/, ""),
      },
    ];

    fetch(
      "https://sheet.best/api/sheets/ad7c60dd-30f2-461f-88f5-fed921477c12",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((r) => r.json())
      .then((data) => {
        // The response comes here
        console.log(data);
      })
      .catch((error) => {
        // Errors are reported there
        console.log(error);
      });

    this.getQuestion();
    this.setState({
      thankYou: true,
      // score :0,
      // response:0
    });
  };

  componentDidMount() {
    this.getQuestion();
  }

  componentDidUpdate() {
    this.scrollTop();
  }

  render() {
    return (
      <Layout className="layout">
        <Headbar />
        <Fade right cascadetop cascade duration={1000}>
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <br />

              {this.state.start === false ? (
                <div>
                  <h2>
                    แบบประเมินความเสี่ยงการติดต่อโรค Covid-19
                    โดยหน่วยงานความปลอดภัยอาชีวอนามัยและสิ่งแวดล้อม
                  </h2>

                  <div className="header">
                  <img
                      src="/images/covid.svg"
                      style={{
                        width: 250,
                        display:"block",
                        marginLeft:"auto",
                        marginRight:"auto",
                      }}
                    />
                  </div>

                  <p>
                    หน่วยงานความปลอดภัยอาชีวอนามัยและสิ่งแวดล้อม
                    ขอความร่วมมือพนักงานและผู้เกี่ยวข้องดำเนินการประเมิณความเสี่ยงโรคติดต่อ
                    Covid-19
                  </p>
                  <h3>ชื่อ-สกุล</h3>
                  <Input
                    type="text"
                    placeholder="กรอก ชื่อ-สกุล"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  ></Input>
                  <br />
                  <br />
                  <h3>เลือกหน่วยงานของท่าน</h3>
                  <Select
                    labelInValue
                    defaultValue={{ key: "null" }}
                    style={{ width: "100%" }}
                    onChange={this.handleSelect}
                  >
                    <Option value="null">------</Option>
                    <Option value="PEM000(Chairman/MD)">
                      PEM000(Chairman/MD)
                    </Option>
                    <Option value="PEM101">PEM101</Option>
                    <Option value="PEM102">PEM102</Option>
                    <Option value="PEM103">PEM103</Option>
                    <Option value="PEM104">PEM104</Option>
                    <Option value="PEM105">PEM105</Option>
                    <Option value="PEM200">PEM200</Option>
                    <Option value="PEM400">PEM400</Option>
                    <Option value="PEM500">PEM500</Option>
                    <Option value="PEM600">PEM600</Option>
                    <Option value="PEM800">PEM800</Option>
                    <Option value="PEM702">PEM702</Option>
                    <Option value="PEM703">PEM703</Option>
                    <Option value="PEM901">PEM901</Option>
                    <Option value="PEM902">PEM902</Option>
                    <Option value="PEM904">PEM904</Option>
                    <Option value="PMW000">PMW000(MD)</Option>
                    <Option value="PMW101">PMW101</Option>
                    <Option value="PMW102">PMW102</Option>
                    <Option value="PMW103">PMW103</Option>
                    <Option value="PMW104">PMW104</Option>
                    <Option value="PMW800">PMW800</Option>
                    <Option value="PMW500">PMW500</Option>
                    <Option value="PMW600">PMW600</Option>
                    <Option value="PMW703">PMW703</Option>
                    <Option value="CI101">CI101</Option>
                    <Option value="บุคคลภายนอก">บุคคลภายนอก</Option>
                  </Select>

                  <br />
                  <br />
                  {this.state.username !== null &&
                    this.state.CompanyName !== null && (
                      <Button type="primary" block onClick={this.getStart}>
                        เริ่มทำแบบทดสอบ
                      </Button>
                    )}
                </div>
              ) : null}

              {this.state.start &&
                this.state.response < 7 &&
                this.state.questionBank.map(
                  ({ question, answers, correct, Id }) => (
                    <QuestionBox
                      question={question}
                      options={answers}
                      Id={Id}
                      selected={(answer) =>
                        this.computeAnswer(answer, correct, Id)
                      }
                    />
                  )
                )}

              {this.state.start &&
                this.state.showBtn &&
                this.state.response === 7 && (
                  <Fade right cascadetop cascade duration={1000}>
                    <img
                      src="/images/doctor.svg"
                       style={{
                          width: 250,
                          display:"block",
                          marginLeft:"auto",
                          marginRight:"auto",                      
                      }}
                    />
                    <h3
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        textAlign: "center",
                      }}
                    >
                      ท่านได้ทำแบบประเมิณเป็นที่เรียบร้อยแล้ว กดปุ่มยืนยัน
                      เพื่อดูผลประเมิณ
                    </h3>
                  </Fade>
                )}

              {this.state.start &&
                this.state.showBtn &&
                this.state.response === 7 && (
                  <Fade right cascadetop cascade duration={1000}>
                    <Button
                      type="primary"
                      block
                      onClick={this.showResult}
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      ยืนยัน
                    </Button>
                    <p></p>
                  </Fade>
                )}

              {this.state.start &&
                this.state.showBtn &&
                this.state.response === 7 && (
                  <Fade right cascadetop cascade duration={1000}>
                    <Button type="primary" block onClick={this.reset}>
                      ย้อนกลับไปแก้ไข
                    </Button>
                  </Fade>
                )}

              {this.state.result && (
                <Analysis
                  score={this.state.score}
                  confirmData={this.confirmData}
                  thanks={this.state.thankYou}
                  name={this.state.username}
                />
              )}
            </div>
            <Foot/>
          </Content>        
        </Fade>
      </Layout>
    );
  }
}

export default QuizzBee;
