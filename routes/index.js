const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("../views/pages/main.ejs");
});

router.get("/users/:id", (req, res) => {
  res.render("../views/pages/welcome.ejs");
});

router.get("/users/:userId/tasks", (req, res) => {
  res.render("../views/pages/tasks.ejs");
});

router.get("/users/:userId/projects", (req, res) => {
  res.render("../views/pages/projects.ejs");
});

router.use("/api", require("../routes/userRoutes.js"));
router.use("/api", require("../routes/projectRoutes.js"));
router.use("/api", require("../routes/taskRoutes.js"));

module.exports = router;
