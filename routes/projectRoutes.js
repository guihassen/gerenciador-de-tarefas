const { Router } = require("express");
const c = require("../controllers/projectController.js");
const taskController = require("../controllers/taskController.js");

const r = Router();

// Rotas para projetos de um usuário específico
r.get("/users/:userId/projects", c.findByUserId);
r.post("/users/:userId/projects", c.create);
r.get("/users/:userId/projects/:id", c.detail);
r.put("/users/:userId/projects/:id", c.update);
r.delete("/users/:userId/projects/:id", c.remove);

// Rotas para tarefas dentro de um projeto específico
r.get(
  "/users/:userId/projects/:projectId/tasks",
  taskController.findByProjectId
);

// Rota para buscar todos os projetos (admin)
r.get("/projects", c.list);

module.exports = r;
