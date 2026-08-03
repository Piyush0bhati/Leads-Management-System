import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function BarChart({ stats }) {
  const data = {
    labels: [
      "New",
      "Contacted",
      "Qualified",
      "Lost",
      "Converted",
    ],
    datasets: [
      {
        label: "Leads",
        data: [
          stats.newLeads,
          stats.contactedLeads,
          stats.qualifiedLeads,
          stats.lostLeads,
          stats.convertedLeads,
        ],
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#8b5cf6",
          "#ef4444",
          "#10b981",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Lead Status Overview
      </h2>

      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;