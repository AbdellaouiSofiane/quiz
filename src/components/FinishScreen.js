function FinishScreen({ points, maxPoints, highScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if ((percentage >= 80) & (percentage < 100)) emoji = "🥇";
  if ((percentage >= 50) & (percentage < 80)) emoji = "👏";
  if ((percentage >= 30) & (percentage < 50)) emoji = "😅";
  if ((percentage >= 0) & (percentage < 30)) emoji = "☹️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart the quiz
      </button>
    </>
  );
}

export default FinishScreen;
