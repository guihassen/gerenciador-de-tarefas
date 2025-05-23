const { Router } = require("express");
const c = require("../controllers/taskController.js");

const r = Router();

// Rotas para tarefas de um usuário específico
r.get("/users/:userId/tasks", c.findByUserId);
r.post("/users/:userId/tasks", c.create);
r.get("/users/:userId/tasks/:id", c.detail);
r.put("/users/:userId/tasks/:id", c.update);
r.delete("/users/:userId/tasks/:id", c.remove);

// Rotas especiais para tarefas
r.patch("/users/:userId/tasks/:id/complete", c.markAsCompleted);
r.patch("/users/:userId/tasks/:id/incomplete", c.markAsIncomplete);

// Rota para buscar todas as tarefas (admin)
r.get("/tasks", c.list);

module.exports = r;
