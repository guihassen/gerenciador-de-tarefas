const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use("/css", express.static("views/css"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware para processar JSON
app.use(express.json());

// Rotas
const routes = require("./routes/index");
app.use("/", routes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
