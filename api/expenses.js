
const express = require("express");
const app = express();
const controller = require("../controllers/expenseController");
const auth = require("../middleware/auth");
app.use(express.json());

// Protected routes
app.get("/", auth, controller.getExpenses);
app.post("/", auth, controller.addExpense);
app.put("/:id", auth, controller.updateExpense);
app.delete("/:id", auth, controller.deleteExpense);

module.exports = app;
