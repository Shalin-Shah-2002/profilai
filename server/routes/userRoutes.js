const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const router = express.Router();

// JWT Middleware
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// GET current user
router.get("/me", authenticate, (req, res) => {
  const { name, email, avatar } = req.user;
  console.log(name, email, avatar);

  res.json({ name, email, avatar });
});

module.exports = router;
