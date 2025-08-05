import { BudgetsGetter } from "../../services/budget";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const BudgetStatusPieChart = () => {
  const [counts, setCounts] = useState({ ok: 0, warning: 0, over: 0 });

  useEffect(() => {
    const getBudget = async () => {
      const data = await BudgetsGetter();
      const tally = { ok: 0, warning: 0, over: 0 };
      data.forEach((item) => {
        if (item.status && tally[item.status] !== undefined) {
          tally[item.status] += 1;
        }
      });
      setCounts(tally);
    };
    getBudget();
  }, []);

  const data = {
    labels: ["OK", "Warning", "Over"],
    datasets: [
      {
        data: [counts.ok, counts.warning, counts.over],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Budget Status Distribution",
        font: { size: 18 },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.label}: ${ctx.raw} budgets (${(
              (ctx.raw / (counts.ok + counts.warning + counts.over)) *
              100
            ).toFixed(1)}%)`,
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default BudgetStatusPieChart;
