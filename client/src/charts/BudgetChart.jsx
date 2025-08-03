import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);
import { useEffect, useState } from "react";
import { chartGetter } from "../services/chart";

const BudgetChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const chart = async () => {
      let payload = await chartGetter();
      if (payload) {
        setData(payload);
      }
    };
    chart();
  }, []);

  const chartData = {
    labels: data.map((item) => `${item.month}/${item.year}`),
    datasets: [
      {
        label: "Total Budget",
        data: data.map((item) => item.total_budget),
        borderColor: "rgb(54, 162, 235)",
        fill: false,
      },
      {
        label: "Total Expenses",
        data: data.map((item) => item.total_expenses),
        borderColor: "rgb(255, 99, 132)",
        fill: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Max Budget vs Actual Spend",
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default BudgetChart;
