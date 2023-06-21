function NextButton({ dispatch }) {
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
