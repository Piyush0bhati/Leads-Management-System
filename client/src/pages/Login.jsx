import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaChartLine,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid Credentials"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 flex justify-center items-center p-6">

      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative bg-white dark:bg-slate-800/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-md p-8">

        <div className="flex flex-col items-center mb-8">

          <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 flex justify-center items-center shadow-lg">

            <FaChartLine className="text-4xl text-blue-600" />

          </div>

          <h1 className="text-3xl font-bold text-white mt-5">
            Lead CRM
          </h1>

          <p className="text-blue-100 mt-2">
            Welcome Back 👋
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="relative">

            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 text-gray-800 dark:text-white outline-none focus:ring-4 focus:ring-blue-400"
            />

          </div>

          <div className="relative">

            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border dark:border-slate-600 dark:bg-slate-700 dark:text-white w-full pl-12 pr-12 py-3 rounded-xl bg-white dark:bg-slate-800 text-gray-800 dark:text-white outline-none focus:ring-4 focus:ring-blue-400"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4 text-gray-500 dark:text-gray-300"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          <div className="flex justify-between items-center text-white text-sm">

            <label className="flex items-center gap-2 cursor-pointer">

              <input type="checkbox" />

              Remember Me

            </label>

            <button
              type="button"
              className="hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white dark:bg-slate-800 text-blue-700 py-3 rounded-xl font-bold text-lg hover:scale-[1.02] duration-300 shadow-lg"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="mt-8 text-center text-blue-100 text-sm">

          © {new Date().getFullYear()} Lead CRM

          <br />

          Developed by
          <span className="font-bold">
            {" "}
            Piyush Bhati
          </span>

        </div>

      </div>
    </div>
  );
}

export default Login;