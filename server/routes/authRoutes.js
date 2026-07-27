const express = require("express");
const router = express.Router();

const {
    register,
    login,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

module.exports = router;