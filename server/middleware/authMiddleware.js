
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from request header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided.",
      });
    }

    // Expected format: Bearer <token>
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save user information for later use
    req.user = decoded;

    // Move to the next middleware/route
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or Expired Token",
    });
  }
};

module.exports = authMiddleware;