const { Router } = require("express");
const c = require("../controllers/projectController.js");
const taskController = require("../controllers/taskController.js");

const r = Router();

// ROTA PRINCIPAL FALTANDO: Buscar projetos de um usuário específico
r.get("/users/:userId/projects", c.findByUserId);

// Rotas para projetos de um usuário específico
r.post("/users/:userId/projects", c.create);
r.get("/users/:userId/projects/:id", c.detail);
r.put("/users/:userId/projects/:id", c.update);
r.delete("/users/:userId/projects/:id", c.remove);

module.exports = r;
