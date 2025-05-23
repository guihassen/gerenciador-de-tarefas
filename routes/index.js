const express = require("express");
const path = require("path");
const router = express.Router();

// Rota principal
router.get("/", (req, res) => {
  res.render("pages/main");
});

// Usa as rotas de usuário em /api
router.use("/api", require("../routes/userRoutes.js"));

// Usa as rotas de projetos em /api
router.use("/api", require("../routes/projectRoutes.js"));

// Usa as rotas de tarefas em /api
router.use("/api", require("../routes/taskRoutes.js"));

module.exports = router;
