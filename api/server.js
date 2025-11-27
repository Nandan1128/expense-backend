const express = require("express");
const cors = require("cors");

const authRoutes = require("../routes/auth");
const expenseRoutes = require("../routes/expenses");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is live");
});
// ROUTES
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
module.exports = app;
