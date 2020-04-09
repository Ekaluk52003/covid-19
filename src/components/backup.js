const QuestionBox = ({question, options, selected, Id}) => {
    console.log('options');
    const [answer, setAnswer ] = useState(options);
    return (
  
      
      <div className="questionBox">
      <div className="question">{question}</div>
      {answer.map((text, index) => (
        <Button 
           type="primary"
          key={index}
          className="answerBtn"
          onClick={() => {
            setAnswer([text]);
            selected(text,{Id});
          }}
        >
          {text}
        </Button>
      ))}
    </div>
    );  
  };