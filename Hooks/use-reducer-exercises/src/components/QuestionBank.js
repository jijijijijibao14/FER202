import React, { useReducer, useEffect } from "react";
import { Button, Container, Card, Alert, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: "",
  correctAnswer: "",
  timer: 10,
  highScore: localStorage.getItem("highScore")
    ? parseInt(localStorage.getItem("highScore"))
    : 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION": {
      const currentQ = state.questions[state.currentQuestion];
      const isCorrect = action.payload === currentQ.answer;

      return {
        ...state,
        selectedOption: action.payload,
        feedback: isCorrect ? "Correct! 🎉" : "Incorrect!",
        correctAnswer: currentQ.answer,
      };
    }

    case "NEXT_QUESTION": {
      const isCorrect =
        state.selectedOption ===
        state.questions[state.currentQuestion].answer;

      const newScore = isCorrect ? state.score + 1 : state.score;

      const isLast = state.currentQuestion + 1 === state.questions.length;

      if (isLast) {
        const currentHigh = parseInt(localStorage.getItem("highScore") || 0);
        if (newScore > currentHigh) {
          localStorage.setItem("highScore", newScore);
        }
      }

      return {
        ...state,
        score: newScore,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        feedback: "",
        correctAnswer: "",
        timer: 10, 
        showScore: isLast,
      };
    }

    case "TICK": 
      return { ...state, timer: state.timer - 1 };

    case "TIME_UP": {
      const isLast = state.currentQuestion + 1 === state.questions.length;

      if (isLast) {
        const currentHigh = parseInt(localStorage.getItem("highScore") || 0);
        if (state.score > currentHigh) {
          localStorage.setItem("highScore", state.score);
        }
      }

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        feedback: "",
        correctAnswer: "",
        timer: 10,
        showScore: isLast,
      };
    }

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: localStorage.getItem("highScore")
          ? parseInt(localStorage.getItem("highScore"))
          : 0,
      };

    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
    feedback,
    correctAnswer,
    timer,
    highScore,
  } = state;

  useEffect(() => {
    if (showScore) return; 

    if (timer > 0) {
      const countdown = setTimeout(() => {
        dispatch({ type: "TICK" });
      }, 1000);
      return () => clearTimeout(countdown);
    } else {
      dispatch({ type: "TIME_UP" }); 
    }
  }, [timer, showScore]);

  const handleOptionSelect = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: option });
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        {showScore ? (
          <div className="text-center">
            <h2>
              Your Score: {score} / {questions.length}
            </h2>
            <h4 className="text-success mt-2">
              🏆 High Score: {Math.max(score, highScore)}
            </h4>
            <Button variant="primary" className="mt-3" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            <h4>
              Question {questions[currentQuestion].id}: <br />
              {questions[currentQuestion].question}
            </h4>

            <div className="d-flex align-items-center mt-2">
              <FaClock
                color={timer <= 5 ? "red" : "green"} 
                className="me-2"
              />
              <span
                style={{
                  color: timer <= 5 ? "red" : "black",
                  fontWeight: "bold",
                }}
              >
                {timer}s remaining
              </span>
            </div>

            <ProgressBar
              className="mt-2"
              now={(timer / 10) * 100}
              variant={timer <= 5 ? "danger" : "success"}
              animated
            />

            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => {
                const isCorrect =
                  option === questions[currentQuestion].answer;
                const isSelected = selectedOption === option;

                let variant = "outline-secondary";
                if (isSelected) {
                  variant = isCorrect ? "success" : "danger";
                }

                return (
                  <Button
                    key={index}
                    variant={variant}
                    className="m-2"
                    onClick={() => handleOptionSelect(option)}
                    disabled={!!selectedOption}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>

            {feedback && (
              <Alert
                variant={feedback.includes("Correct") ? "success" : "danger"}
                className="mt-3 text-center fw-bold"
              >
                {feedback.includes("Correct") ? (
                  <>
                    <FaCheckCircle color="green" size={24} className="me-2" />
                    {feedback}
                  </>
                ) : (
                  <>
                    <FaTimesCircle color="red" size={24} className="me-2" />
                    Incorrect! The correct answer is:{" "}
                    <span className="text-decoration-underline">
                      {correctAnswer}
                    </span>
                  </>
                )}
              </Alert>
            )}

            <Button
              variant="primary"
              className="mt-3"
              disabled={!selectedOption && timer > 0}
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;
