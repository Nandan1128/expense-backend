
const express = require("express");
const app = express();
const controller = require("../controllers/authController");
app.use(express.json());

// POST /api/auth/register
app.post("/register", controller.register);
// POST /api/auth/login
app.post("/login", controller.login);

module.exports = app;
