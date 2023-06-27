import { useReducer, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import { useQuestions } from "../contexts/QuestionContext";

export default function App() {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
    errorMessage,
    dispatch,
  } = useQuestions();

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((a, b) => a + b.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error message={errorMessage} />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}
        <footer>
          {status === "active" && (
            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
          )}
          {Boolean((answer !== null) & (status !== "finished")) && (
            <NextButton dispatch={dispatch} />
          )}
        </footer>
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
