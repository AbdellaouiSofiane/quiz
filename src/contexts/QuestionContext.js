import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 30 * 15,
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error", errorMessage: action.payload };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
        status:
          state.index === state.questions.length - 1
            ? "finished"
            : state.status,
        highScore: Math.max(state.highScore, state.points),
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "restart":
      return {
        ...initialState,
        highScore: state.highScore,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      const secondsRemaining = state.secondsRemaining - 1;
      if (secondsRemaining === 0) {
        return { ...state, status: "finished" };
      }
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    default:
      throw new Error("Unknown action type");
  }
}

export function QuestionProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      secondsRemaining,
      errorMessage,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) =>
        dispatch({ type: "dataFailed", payload: error.message })
      );
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        errorMessage,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestions() {
  return useContext(QuestionContext);
}
