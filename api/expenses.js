const express = require("express");
const app = express();
const controller = require("../controllers/expenseController");
app.use(express.json());
app.get("/", controller.getExpenses);
app.post("/", controller.addExpense);
app.put("/:id", controller.updateExpense);
app.delete("/:id", controller.deleteExpense);
module.exports = app;
