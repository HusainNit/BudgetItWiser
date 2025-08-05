import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const OneBudgetChart = ({ total_budget, total_expenses, status }) => {
  const percentage = total_budget
    ? Math.min(Math.round((total_expenses / total_budget) * 100), 100)
    : 0;

  const colorMap = {
    ok: "#4CAF50",
    warning: "#FFC107",
    over: "#F44336",
  };

  const chartColor = colorMap[status] || "#999";

  const data = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [chartColor, "#e0e0e0"],
        borderRadius: 5,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: "75%",
    animation: {
      animateRotate: true,
      duration: 1000,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    hover: { mode: null },
  };

  return (
    <div className="gaugeContainer">
      <Doughnut data={data} options={options} />
      <div className="gaugeCenterText">{percentage}%</div>
      <div className="gaugeLabels">
        <div className="labelBlock">
          <span className="labelTitle">Budget: </span>
          <span className="labelValue">{total_budget} BD</span>
        </div>
        <div className="labelBlock">
          <span className="labelTitle">Spent: </span>
          <span className="labelValue">{total_expenses} BD</span>
        </div>
      </div>
    </div>
  );
};

export default OneBudgetChart;
