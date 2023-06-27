import { useQuestions } from "../contexts/QuestionContext";

function Progress() {
  const { questions, index, points, answer } = useQuestions();
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((a, b) => a + b.points, 0);
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
