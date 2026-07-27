const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://leads-management-system-rho.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Lead Management API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});