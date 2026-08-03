import { useState, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";






function Navbar() {
  const [time, setTime] = useState(new Date());
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <nav className="bg-gradient-to-r from-blue-600 dark:from-slate-800 dark:to-slate-900 to-indigo-600 shadow-lg px-8 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-white">
          📊 Lead CRM
        </h1>
        <p className="text-blue-100 text-sm">
          Sales Dashboard
        </p>
        <p className="text-blue-100 text-sm">
          Manage your business leads
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right text-white">
          <p>{time.toLocaleTimeString()}</p>
          <p className="text-sm">
            {time.toLocaleDateString()}
          </p>
        </div>
        <button className="relative text-white text-xl hover:scale-110 transition">
          <FaBell />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-xl shadow">
          <FaUserCircle className="text-2xl text-blue-600" />
          <div>
            <p className="font-semibold">Piyush</p>
            <p className="text-xs text-gray-500 dark:text-gray-300">Admin</p>
          </div>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white dark:bg-slate-800 p-3 rounded-full shadow hover:scale-110 transition"
        >
          {darkMode ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-slate-700" />
          )}
        </button>
      </div>
    </nav>

  );
}

export default Navbar;