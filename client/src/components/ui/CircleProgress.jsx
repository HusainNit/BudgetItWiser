import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleProgress = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 100); // Adjust speed here
    } else {
      setProgress(0); // Reset when loading ends
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <div
      className="rotating"
      style={{ width: "80px", height: "80px", margin: "1rem auto" }}
    >
      <CircularProgressbar
        value={progress}
        text="loading ..."
        styles={buildStyles({
          pathColor: "#846fff",
          textColor: "#333",
          trailColor: "#eee",
          strokeLinecap: "round",
        })}
      />
    </div>
  );
};

export default CircleProgress;
