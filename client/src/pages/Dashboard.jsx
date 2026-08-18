import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import StatusPieChart from "../components/StatusPieChart";
import BarChart from "../components/BarChart";
import UpcomingFollowUps from "../components/UpcomingFollowUps";

import {
  FaUsers,
  FaUserPlus,
  FaPhone,
  FaChartLine,
  FaTimesCircle,
  FaCheckCircle,
  FaPlus,
  FaFileExport,
  FaCalendarAlt,
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState(null);

  const hour = new Date().getHours();
  const navigate = useNavigate();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
        ? "Good Afternoon"
        : "Good Evening";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">

          {/* HERO SECTION */}

          <div className="bg-gradient-to-r from-blue-600 dark:from-slate-800 dark:to-slate-900 to-indigo-600 rounded-3xl p-8 text-white shadow-xl mb-8">

            <h1 className="text-4xl font-bold">
              👋 {greeting}, Piyush
            </h1>

            <p className="mt-3 text-blue-100 text-lg">
              Manage your customer leads, monitor sales performance,
              and grow your business with ease.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={() => navigate("/leads")}
                className="flex items-center gap-2 bg-white dark:bg-slate-800 text-blue-600 px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
              >
                <FaPlus />
                Add Lead
              </button>

              <button className="flex items-center gap-2 border border-white px-6 py-3 rounded-xl hover:bg-white dark:bg-slate-800 hover:text-blue-600 transition">
                <FaFileExport />
                Export Report
              </button>

            </div>

          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white dark:text-white">
              Today's Summary
            </h2>

            <p className="text-gray-500 dark:text-gray-300 mt-2">
              You currently have
              <span className="font-bold text-blue-600">
                {" "}{stats?.totalLeads || 0}{" "}
              </span>
              leads in your CRM.

              <br />

              <span className="text-green-600 font-semibold">
                {stats?.convertedLeads || 0}
              </span>
              {" "}have been converted,
              {" "}
              <span className="text-red-600 font-semibold">
                {stats?.lostLeads || 0}
              </span>
              {" "}are lost.

              Keep following up with your leads to improve conversions 🚀
            </p>
          </div>

          {/* QUICK ACTIONS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer">
              <div className="text-4xl mb-4">🚀</div>

              <h2 className="text-xl font-bold">
                Quick Add Lead
              </h2>

              <p className="text-gray-500 dark:text-gray-300 mt-2">
                Add a new lead in just a few clicks.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer">
              <FaChartLine className="text-4xl text-blue-600 mb-4" />

              <h2 className="text-xl font-bold">
                Analytics
              </h2>

              <p className="text-gray-500 dark:text-gray-300 mt-2">
                View lead performance and conversion trends.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer">
              <FaCalendarAlt className="text-4xl text-green-600 mb-4" />

              <h2 className="text-xl font-bold">
                Follow-ups
              </h2>

              <p className="text-gray-500 dark:text-gray-300 mt-2">
                Stay updated with your upcoming meetings.
              </p>
            </div>

          </div>

          {/* LOADING */}

          {!stats ? (
            <div className="space-y-8 animate-pulse">

              {/* Hero Skeleton */}
              <div className="bg-gray-300 h-52 rounded-3xl"></div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-gray-300 h-36 rounded-2xl"
                  ></div>
                ))}
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="bg-gray-300 h-36 rounded-2xl"
                  ></div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-gray-300 h-96 rounded-2xl"></div>
                <div className="bg-gray-300 h-96 rounded-2xl"></div>
              </div>

            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-gray-500 dark:text-gray-300 font-medium">
                    Conversion Rate
                  </h3>

                  <h2 className="text-4xl font-bold mt-2 text-green-600">
                    {stats.totalLeads
                      ? Math.round((stats.convertedLeads / stats.totalLeads) * 100)
                      : 0}%
                  </h2>

                  <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{
                        width: `${stats.totalLeads
                          ? (stats.convertedLeads / stats.totalLeads) * 100
                          : 0
                          }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-gray-500 dark:text-gray-300">
                    Lost Rate
                  </h3>

                  <h2 className="text-4xl font-bold mt-2 text-red-600">
                    {stats.totalLeads
                      ? Math.round((stats.lostLeads / stats.totalLeads) * 100)
                      : 0}%
                  </h2>

                  <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{
                        width: `${stats.totalLeads
                          ? (stats.lostLeads / stats.totalLeads) * 100
                          : 0
                          }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-gray-500 dark:text-gray-300">
                    Qualified Leads
                  </h3>

                  <h2 className="text-4xl font-bold mt-2 text-purple-600">
                    {stats.qualifiedLeads}
                  </h2>

                  <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                    <div
                      className="bg-purple-500 h-3 rounded-full"
                      style={{
                        width: `${stats.totalLeads
                          ? (stats.qualifiedLeads / stats.totalLeads) * 100
                          : 0
                          }%`,
                      }}
                    />
                  </div>
                </div>

              </div>
              {/* STAT CARDS */}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

                <StatCard
                  title="Total Leads"
                  value={stats.totalLeads}
                  icon={FaUsers}
                  color="border-blue-500"
                  bg="bg-blue-100 text-blue-600"
                />

                <StatCard
                  title="New Leads"
                  value={stats.newLeads}
                  icon={FaUserPlus}
                  color="border-green-500"
                  bg="bg-green-100 text-green-600"
                />

                <StatCard
                  title="Contacted Leads"
                  value={stats.contactedLeads}
                  icon={FaPhone}
                  color="border-yellow-500"
                  bg="bg-yellow-100 text-yellow-600"
                />

                <StatCard
                  title="Qualified Leads"
                  value={stats.qualifiedLeads}
                  icon={FaChartLine}
                  color="border-purple-500"
                  bg="bg-purple-100 text-purple-600"
                />

                <StatCard
                  title="Lost Leads"
                  value={stats.lostLeads}
                  icon={FaTimesCircle}
                  color="border-red-500"
                  bg="bg-red-100 text-red-600"
                />

                <StatCard
                  title="Converted Leads"
                  value={stats.convertedLeads}
                  icon={FaCheckCircle}
                  color="border-emerald-500"
                  bg="bg-emerald-100 text-emerald-600"
                />

              </div>

              {/* CHART SECTION */}

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                  <BarChart stats={stats} />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                  <StatusPieChart stats={stats} />
                </div>

              </div>

              {/* FOLLOWUPS */}

              <div className="mt-8">
                <UpcomingFollowUps />
              </div>

            </>
          )}
          <footer className="mt-12 border-t pt-8 text-center text-gray-500 dark:text-gray-300">

            <h2 className="text-lg font-semibold text-gray-700">
              Lead CRM
            </h2>

            <p className="mt-2">
              Built with React, Node.js, Express & MongoDB
            </p>

            <div className="mt-4 flex justify-center gap-6">

              <a
                href="https://github.com/Piyush0bhati"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600"
              >
                GitHub
              </a>

              <a
                href="https://my-portfolio-xi-fawn-57.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600"
              >
                Portfolio
              </a>

            </div>

            <p className="mt-4 text-sm">
              © {new Date().getFullYear()} Piyush Bhati
            </p>

          </footer>
        </div>
      </div>
    </div>

  );

}

export default Dashboard;