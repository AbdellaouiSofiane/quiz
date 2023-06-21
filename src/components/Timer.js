import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <div className="timer">
      {`${minutes < 10 ? "0" : ""}${minutes}:
        ${seconds < 10 ? "0" : ""}${seconds}`}
    </div>
  );
}

export default Timer;
