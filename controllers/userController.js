const svc = require("../services/userService");

exports.create = (req, res) => {
  try {
    res.status(201).json(svc.create(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
exports.list = (_, res) => res.json(svc.list());
exports.detail = (req, res) => {
  const r = svc.detail(req.params.id);
  r ? res.json(r) : res.sendStatus(404);
};
exports.update = (req, res) => {
  try {
    res.json(svc.update(req.params.id, req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
exports.remove = (req, res) => {
  svc.remove(req.params.id);
  res.sendStatus(204);
};
exports.totals = (_, res) => res.json(svc.withOrderTotals());
