const { pool } = require("../config/db.js");
const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  project_name: Joi.string().max(100).required(),
  description: Joi.string().allow("", null),
  project_status: Joi.string().max(50).required(),
  is_active: Joi.boolean().default(true),
  user_id: Joi.number().integer().positive().required(),
});
