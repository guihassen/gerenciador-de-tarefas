const { pool } = require("../config/db.js");
const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  task_name: Joi.string().max(100).required(),
  task_description: Joi.string().allow(null, ""),
  due_date: Joi.date().allow(null),
  due_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .allow(null, ""),
  has_notification: Joi.boolean().default(false),
  task_priority: Joi.string()
    .valid("baixa", "media", "alta", "urgente")
    .required(),
  is_completed: Joi.boolean().default(false),
  project_id: Joi.number().integer().allow(null),
  user_id: Joi.number().integer().required(),
});
