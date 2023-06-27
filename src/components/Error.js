import { useQuestions } from "../contexts/QuestionContext";

function Error() {
  const { errorMessage } = useQuestions();
  return (
    <p className="error">
      <span>💥</span> {errorMessage}
    </p>
  );
}

export default Error;
