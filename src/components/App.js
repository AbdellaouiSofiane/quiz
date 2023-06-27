import { QuestionProvider } from "../contexts/QuestionContext";
import Header from "./Header";
import Main from "./Main";

export default function App() {
  return (
    <div className="app">
      <QuestionProvider>
        <Header />
        <Main />
      </QuestionProvider>
    </div>
  );
}
