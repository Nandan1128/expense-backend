const express = require("express");
const router = express.Router();
const controller = require("../controllers/expenseController");

router.post("/", controller.addExpense);
router.get("/", controller.getExpenses);
router.put("/:id", controller.updateExpense);
router.delete("/:id", controller.deleteExpense);

module.exports = router;
