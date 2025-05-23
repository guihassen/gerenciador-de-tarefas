const { pool } = require("../config/db.js");
const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  task_name: Joi.string().max(100).required(),
  task_description: Joi.string().allow(null, ""),
  due_date: Joi.date().required(),
  due_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .required(),
  has_notification: Joi.boolean(),
  task_priority: Joi.string().valid("baixa", "média", "alta").allow(null, ""),
  is_completed: Joi.boolean().required(),
  project_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
});
