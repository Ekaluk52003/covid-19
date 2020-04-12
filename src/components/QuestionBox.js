import React, { useState } from "react";
import Fade from 'react-reveal/Fade';
import {
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Tooltip,
  Space,
  Card,
} from "antd";

const QuestionBox = ({ question, options, selected, Id }) => {
  console.log("options");
  const [answer, setAnswer] = useState(options);
  const [double, setDouble] = useState(false);
  return (
    <Fade right cascadetop cascade duration={1000}>
    <div className="site-card-border-less-wrapper">
      <Card>
        <h3>{question}</h3>
        {answer.map((text, index) => (
          <Button
          disabled={double}
            type="primary" ghost
            key={index}
            className="answerBtn"
            style={{ marginRight: 40, marginTop: 20 }}
            onClick={() => {
              setAnswer([text]);
              selected(text, { Id });
              setDouble(true);
            }}
          >
            {text}
          </Button>        
           

        ))}
      </Card>
    </div>
    </Fade>
  
  );
};

console.log("options");

export default QuestionBox;
