import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ExpensesGetter } from "../services/expenses";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Title
);

const ExpenseStatusBarChart = () => {
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [maxValues, setMaxValues] = useState({ fixed: 0, one_time: 0 });

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await ExpensesGetter();
      const map = {};

      data.forEach((exp) => {
        const { month, year } = exp.budget;
        const key = `${year}-${String(month).padStart(2, "0")}`;
        if (!map[key]) map[key] = { fixed: 0, one_time: 0 };

        const type = exp.expense_type;
        const amount = parseFloat(exp.amount);
        if (type === "fixed" || type === "one_time") {
          map[key][type] += amount;
        }
      });

      const totals = Object.entries(map)
        .sort()
        .map(([date, values]) => ({
          date,
          fixed: values.fixed,
          one_time: values.one_time,
        }));

      const maxFixed = Math.max(...totals.map((t) => t.fixed));
      const maxOneTime = Math.max(...totals.map((t) => t.one_time));

      setMonthlyTotals(totals);
      setMaxValues({ fixed: maxFixed, one_time: maxOneTime });
    };

    fetchExpenses();
  }, []);

  const data = {
    labels: monthlyTotals.map((t) => t.date),
    datasets: [
      {
        label: "Fixed Expenses",
        data: monthlyTotals.map((t) => t.fixed),
        backgroundColor: "#846fff",
      },
      {
        label: "One-Time Expenses",
        data: monthlyTotals.map((t) => t.one_time),
        backgroundColor: "#38d9c9ff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Monthly Expenses: Fixed vs One-Time",
      },
      tooltip: {
        callbacks: {
          label: function (ctx) {
            const type = ctx.dataset.label.includes("Fixed")
              ? "fixed"
              : "one_time";
            const value = ctx.raw;
            const max = maxValues[type];
            const percent = ((value / max) * 100).toFixed(1);
            return `${ctx.dataset.label}: ${value} (${percent}%)`;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ExpenseStatusBarChart;
