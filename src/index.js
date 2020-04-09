import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Analysis from "./components/Analysis";
import { Button, Layout, Menu, Input, Switch, PageHeader } from "antd";
import {
  FundOutlined,
  CloseOutlined,
  CheckOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import mySvg from "./covid.svg";

const { Header, Content, Footer } = Layout;

class QuizzBee extends Component {
  state = {
    questionBank: [],
    score: 0,
    response: 0,
    username: null,
    start: false,
    thankYou: false,
    staff: true,
    PreciseCompanyName: null,
    CompanyName: null,
    meaning: null,
  };

  getStart = () => {
    this.setState({
      start: true,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //toggle switch button by changing true or false
  changeStaff = () => {
    this.setState((prevState) => ({
      staff: !prevState.staff,
      PreciseCompanyName: null,
      CompanyName: null,
    }));
  };

  getQuestion = () => {
    quizService().then((question) => {
      this.setState({
        questionBank: question,
      });
    });
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
        meaning: "ระดับความเสี่ยงน้อยมาก",
      });
    }
    if (this.state.score > 7 && this.state.score < 12 ) {
      this.setState({
        meaning: "ระดับที่มีความเสี่ยง",
      });
    }
    if (this.state.score > 11 && this.state.score < 20) {
      this.setState({
        meaning: "ระดับความเสี่ยงมาก",
      });
    }
    if (this.state.score > 19 ) {
      this.setState({
        meaning: "ระดับความเสี่ยงมากที่สุด",
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
  };

  confirmData = () => {
    const data = [
      {
        username: this.state.username,
        score: this.state.score,
        staff: this.state.staff,
        PreciseCompanyName: this.state.PreciseCompanyName,
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
  render() {
    return (
      <Layout className="layout">
        <Header>
          <img src="/images/logo512.png" style={{ float: "left", height: 40, marginTop:10, marginRight:10, }} />
          <h3 style={{ color: "white" }}>
            แบบประเมินความเสี่ยงการติดต่อของ Covid-19 
          </h3>
        </Header>

        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <br />

            {this.state.start === false ? (
              <div>
                <h2>
                  <FundOutlined /> แบบประเมินความเสี่ยงการติดต่อของ Covid-19
                  โดยฝ่าย Safety
                </h2>
                <div className="header">
                  <img
                    src={mySvg}
                    style={{
                      height: "300px",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                </div>
                <p>
                  ทางหน่วยงานด้านความปลอดภัย บริษัท พรีไซค์
                  ขอความร่วมมือพนักงานและผู้เกี่ยวข้องดำเนินการประเมิณความเสี่ยงการติดต่อของ
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
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                  onChange={this.changeStaff}
                />

                {this.state.staff === true
                  ? " ท่านเป็นพนักงาน บริษัท พรีไซค์"
                  : " ท่านไม่ได้เป็นพนักงาน บริษัท พรีไซค์"}
                <br />
                <br />

                {this.state.staff === true && (
                  <Input
                    type="text"
                    name="PreciseCompanyName"
                    placeholder="หน่วยงาน (ระบุหน่วยงานให้ชัดเจน เช่น PEM101)*"
                    value={this.state.PreciseCompanyName}
                    onChange={this.handleChange}
                  ></Input>
                )}

                {this.state.staff === false && (
                  <Input
                    type="text"
                    name="CompanyName"
                    placeholder="กรอกชื่อบริษัทที่ท่านทำงาน"
                    value={this.state.CompanyName}
                    onChange={this.handleChange}
                  ></Input>
                )}

                <br />
                <br />
                <Button type="primary" block onClick={this.getStart}>
                  เริ่มทำแบบทดสอบ
                </Button>
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

            {/* {this.state.questionBank.map( (item) => <li>{item.Id}</li>)} */}

            {this.state.response === 7 && (
              <Analysis
                score={this.state.score}
                confirmData={this.confirmData}
                thanks={this.state.thankYou}
                name={this.state.username}
              />
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          แบบประเมินความเสี่ยงการติดต่อของ Covid-19 โดยฝ่าย Safety
        </Footer>
      </Layout>
    );
  }
}

ReactDOM.render(<QuizzBee />, document.getElementById("root"));
