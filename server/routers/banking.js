const express = require("express");
const jwt = require("jsonwebtoken");
const { verifyToken, SECRET_KEY } = require("../middleware/authMiddleware");

const router = express.Router();

let balance = 1000; // initial balance
const user = {
  username: "user1",
  password: "password123",
};

// LOGIN ROUTE
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// GET BALANCE (Protected)
router.get("/balance", verifyToken, (req, res) => {
  res.json({ balance });
});

// DEPOSIT (Protected)
router.post("/deposit", verifyToken, (req, res) => {
  const { amount } = req.body;
  balance += amount;
  res.json({ message: `Deposited $${amount}`, newBalance: balance });
});

// WITHDRAW (Protected)
router.post("/withdraw", verifyToken, (req, res) => {
  const { amount } = req.body;
  if (amount > balance) {
    return res.status(400).json({ message: "Insufficient balance" });
  }
  balance -= amount;
  res.json({ message: `Withdrew $${amount}`, newBalance: balance });
});

module.exports = router;
