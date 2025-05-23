const { Router } = require("express");
const c = require("../controllers/taskController.js");

const r = Router();

// Rotas para tarefas de um usuário específico
r.get("/users/:id/tasks", c.findByUserId);
r.post("/users/:id/tasks", c.create);
r.get("/users/:id/tasks/:taskId", c.findByID);
r.put("/users/:id/tasks/:taskId", c.update);
r.delete("/users/:id/tasks/:taskId", c.remove);

// Rotas especiais para tarefas
r.patch("/users/:id/tasks/:taskId/complete", c.markAsCompleted);
r.patch("/users/:id/tasks/:taskId/incomplete", c.markAsIncomplete);

// Rota para buscar todas as tarefas (admin)
r.get("/tasks", c.findAll);

module.exports = r;
