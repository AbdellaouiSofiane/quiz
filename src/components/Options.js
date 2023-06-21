function Options({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={index}
          className={`btn btn-option
            ${index === answer && "answer"}
            ${hasAnswered && index === question.correctOption && "correct"}
            ${hasAnswered && index !== question.correctOption && "wrong"}
          `}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
