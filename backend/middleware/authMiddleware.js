const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Decode the token and verify it using the JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object
      req.user = await User.findById(decoded.id).select("-password");

      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error("Error in authMiddleware:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token is provided
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};

module.exports = authMiddleware;
