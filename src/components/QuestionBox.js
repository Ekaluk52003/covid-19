import React, { useState } from "react";
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
    <div className="site-card-border-less-wrapper">
      <Card>
        <h3>{question}</h3>
        {answer.map((text, index) => (
          <Button
          disabled={double}
            type="primary"
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
  
  );
};

console.log("options");

export default QuestionBox;
