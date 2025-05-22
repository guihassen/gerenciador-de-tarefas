const express = require("express");
const router = express.Router();

// Rota principal
router.get("/", (req, res) => {
  res.send("Rota principal funcionando!");
});

// Usa as rotas de usuário em /users
router.use("/api", require("../routes/userRoutes.js"));

module.exports = router;
