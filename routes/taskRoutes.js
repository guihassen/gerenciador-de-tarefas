const { Router } = require("express");
const c = require("../controllers/taskController.js");

const r = Router();

// Rotas para tarefas de um usuário específico - PARÂMETROS CONSISTENTES
r.get("/users/:userId/tasks", c.findByUserId);
r.post("/users/:userId/tasks", c.create);
r.get("/users/:userId/tasks/:taskId", c.detail);
r.put("/users/:userId/tasks/:taskId", c.update);
r.delete("/users/:userId/tasks/:taskId", c.remove);

// Rotas especiais para tarefas
r.patch("/users/:userId/tasks/:taskId/complete", c.markAsCompleted);
r.patch("/users/:userId/tasks/:taskId/incomplete", c.markAsIncomplete);

module.exports = r;
