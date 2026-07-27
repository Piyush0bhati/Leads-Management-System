import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", formData);

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 text-white flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-6">
          Join Our CRM
        </h1>

        <p className="text-xl text-center max-w-md">
          Create your account and start managing your leads efficiently.
        </p>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-100">
        <form
          onSubmit={handleRegister}
          className="bg-white shadow-2xl rounded-2xl p-10 w-[420px]"
        >
          <h2 className="text-4xl font-bold text-center mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 text-center mb-8">
            Register to get started
          </p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-6 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />

          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Create Account
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;