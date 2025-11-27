const express = require("express");
const app = express();
const controller = require("../controllers/authController");
app.use(express.json());
app.post("/register", controller.register);
app.post("/login", controller.login);
module.exports = app;
