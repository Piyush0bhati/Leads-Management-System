import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function StatusPieChart({ stats }) {
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
        data: [
          stats.newLeads,
          stats.contactedLeads,
          stats.qualifiedLeads,
          stats.lostLeads,
          stats.convertedLeads,
        ],
        backgroundColor: [
          "#22c55e", // New
          "#3b82f6", // Contacted
          "#8b5cf6", // Qualified
          "#ef4444", // Lost
          "#10b981", // Converted
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Lead Status Distribution
      </h2>

      <div className="w-[400px] h-[400px] mx-auto">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default StatusPieChart;