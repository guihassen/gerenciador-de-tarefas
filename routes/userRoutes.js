const { Router } = require("express");
const c = require("../controllers/userController.js");

const r = Router();

r.get("/users", c.list);
r.post("/users", c.create);
r.get("/users/:id", c.detail);
r.put("/users/:id", c.update);
r.delete("/users/:id", c.remove);
r.get("/users-totals", c.totals);

module.exports = r;
