const { Router } = require("express");
const c = require("../controllers/projectController.js");
const taskController = require("../controllers/taskController.js");

const r = Router();

// Rotas para projetos de um usuário específico
r.get("/users/:id/projects", c.findByUserId);
r.post("/users/:id/projects", c.create);
r.get("/users/:id/projects/:projectId", c.findByID);
r.put("/users/:id/projects/:projectId", c.update);
r.delete("/users/:id/projects/:projectId", c.remove);

// Rotas para tarefas dentro de um projeto específico
r.get("/users/:id/projects/:projectId/tasks", taskController.findByProjectId);

// Rota para buscar todos os projetos (admin)
r.get("/projects", c.findAll);

module.exports = r;
