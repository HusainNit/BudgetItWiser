import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRef } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseBarChart = ({ total, spent }) => {
  const percentage = Math.round((spent / total) * 100);
  const remaining = total - spent;
  const chartRef = useRef();

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height } = chart;
      const ctx = chart.ctx;
      ctx.restore();
      const fontSize = height / 12;
      ctx.font = `${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#333";

      const text = `${percentage}%\n${spent.toLocaleString()} BHD`;
      const lines = text.split("\n");
      lines.forEach((line, i) => {
        ctx.fillText(line, width / 2, height / 2 + i * fontSize * 1.1);
      });

      ctx.save();
    },
  };

  const data = {
    datasets: [
      {
        data: [spent, remaining],
        backgroundColor: ["#846fff", "#cccccc"],
        borderWidth: 0,
        borderRadius: 15,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 360,
    cutout: "70%",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2rem",
        margin: "20px 0 20px 0",
      }}
    >
      <div style={{ width: "200px", height: "200px" }}>
        <Doughnut
          data={data}
          options={options}
          plugins={[centerTextPlugin]}
          ref={chartRef}
        />
      </div>
      <div
        style={{
          textAlign: "left",
          fontSize: "1.2rem",
          color: "black",
          padding: "0 0 0 10px",
        }}
      >
        <strong>Left:</strong>
        <br />
        {remaining.toLocaleString()} BHD
      </div>
    </div>
  );
};

export default ExpenseBarChart;
