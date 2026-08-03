import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  FaUserCircle,
  FaLock,
  FaMoon,
  FaBell,
} from "react-icons/fa";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">

          <h1 className="text-4xl font-bold mb-8">
            ⚙ Settings
          </h1>

          {/* Profile */}

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 mb-8">

            <div className="flex items-center gap-4 mb-6">

              <FaUserCircle className="text-6xl text-blue-600" />

              <div>

                <h2 className="text-2xl font-bold">
                  Piyush Bhati
                </h2>

                <p className="text-gray-500 dark:text-gray-300">
                  Admin
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                defaultValue="Piyush Bhati"
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 p-3 rounded"
              />

              <input
                defaultValue="bhatixpiyush@gmail.com"
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 p-3 rounded"
              />

            </div>

            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl">
              Update Profile
            </button>

          </div>

          {/* Password */}

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 mb-8">

            <div className="flex items-center gap-3 mb-5">

              <FaLock />

              <h2 className="text-xl font-bold">
                Change Password
              </h2>

            </div>

            <div className="grid gap-4">

              <input
                type="password"
                placeholder="Current Password"
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 p-3 rounded"
              />

              <input
                type="password"
                placeholder="New Password"
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 p-3 rounded"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 p-3 rounded"
              />

            </div>

            <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl">
              Change Password
            </button>

          </div>

          {/* Preferences */}

          <div className="bg-white dark:bg-slate-800 white rounded-3xl shadow-lg p-8">

            <h2 className="text-xl font-bold mb-6">
              Preferences
            </h2>

            <div className="flex justify-between items-center py-4">

              <div className="flex gap-3 items-center">

                <FaMoon />

                Dark Mode

              </div>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() =>
                  setDarkMode(!darkMode)
                }
              />

            </div>

            <div className="flex justify-between items-center py-4">

              <div className="flex gap-3 items-center">

                <FaBell />

                Email Notifications

              </div>

              <input
                type="checkbox"
                defaultChecked
              />

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;