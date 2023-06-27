import { useQuestions } from "../contexts/QuestionContext";

function NextButton() {
  const { dispatch } = useQuestions();
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      NEXT
    </button>
  );
}

export default NextButton;
