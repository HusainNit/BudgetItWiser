import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { useState, useEffect } from "react";
import { ExpensesGetter } from "../services/expenses";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

export default function CategoryExpensesBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const chart = async () => {
      let payload = await ExpensesGetter();
      if (payload) {
        setData(payload);
      }
    };
    chart();
  }, []);

  const newData = {
    labels: data.map((c) => c.expense_name),
    datasets: [
      {
        label: "Spent",
        data: data.map((c) => c.amount),
        backgroundColor: "#846fff",
        stack: "Stack 0",
      },
      {
        label: "Remaining",
        data: data.map((c) => c.max_expense_budget - c.amount),
        backgroundColor: "#cccccc",
        stack: "Stack 0",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Expense Allocation by Item",
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${ctx.raw.toLocaleString()} BHD`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        max: Math.max(...data.map((c) => c.max_expense_budget)) * 1.1,
      },
      y: { stacked: true },
    },
  };

  return (
    <>
      <Bar data={newData} options={options} />
    </>
  );
}
