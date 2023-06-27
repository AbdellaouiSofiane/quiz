import { useQuestions } from "../contexts/QuestionContext";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

function Main() {
  const { status, answer } = useQuestions();
  return (
    <main className="main">
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}
      {status === "active" && (
        <>
          <Progress />
          <Question />
        </>
      )}
      <footer>
        {status === "active" && <Timer />}
        {answer !== null && status !== "finished" && <NextButton />}
      </footer>
      {status === "finished" && <FinishScreen />}
    </main>
  );
}

export default Main;
