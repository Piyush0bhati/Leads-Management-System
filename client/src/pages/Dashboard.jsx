import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import StatusPieChart from "../components/StatusPieChart";
import BarChart from "../components/BarChart";
import UpcomingFollowUps from "../components/UpcomingFollowUps";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/leads/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">
            Dashboard
          </h1>

          {!stats ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Leads" value={stats.totalLeads} />
                <StatCard title="New Leads" value={stats.newLeads} />
                <StatCard title="Contacted Leads" value={stats.contactedLeads} />
                <StatCard title="Qualified Leads" value={stats.qualifiedLeads} />
                <StatCard title="Lost Leads" value={stats.lostLeads} />
                <StatCard title="Converted Leads" value={stats.convertedLeads} />
              </div>

              {/* Pie Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StatusPieChart stats={stats} />
                <BarChart stats={stats} />
                <UpcomingFollowUps />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;