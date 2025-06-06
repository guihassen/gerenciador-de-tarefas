const db = require("../config/db.js");
const schema = require("../models/projectModel.js");

async function validate(data) {
  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
  return value;
}

module.exports = {
  async create(project) {
    project = await validate(project);

    // Verificar se o usuário existe
    const userCheck = await db.query("SELECT id FROM users WHERE id = $1", [
      project.user_id,
    ]);
    if (userCheck.rows.length === 0) {
      throw new Error("User not found");
    }

    const result = await db.query(
      `INSERT INTO projects
       (project_name, description, project_status, is_active, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        project.project_name,
        project.description,
        project.project_status,
        project.is_active ?? true,
        project.user_id,
      ]
    );
    return { ...project, id: result.rows[0].id };
  },

  async findAll() {
    const result = await db.query(
      `SELECT id, project_name, description, project_status, is_active, user_id
       FROM projects`
    );
    return result.rows;
  },

  async findByID(id) {
    const result = await db.query(
      `SELECT id, project_name, description, project_status, is_active, user_id
       FROM projects
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async update(id, payload) {
    payload = await validate(payload);

    // Verificar se o usuário existe
    const userCheck = await db.query("SELECT id FROM users WHERE id = $1", [
      payload.user_id,
    ]);
    if (userCheck.rows.length === 0) {
      throw new Error("User not found");
    }

    await db.query(
      `UPDATE projects
       SET project_name = $1,
           description = $2,
           project_status = $3,
           is_active = $4,
           user_id = $5
       WHERE id = $6`,
      [
        payload.project_name,
        payload.description,
        payload.project_status,
        payload.is_active ?? true,
        payload.user_id,
        id,
      ]
    );
    return this.findByID(id);
  },

  // Buscar projetos por usuário
  async findByUserId(userId) {
    const result = await db.query(
      `SELECT id, project_name, description, project_status, is_active, user_id
       FROM projects
       WHERE user_id = $1
       ORDER BY id DESC`,
      [userId]
    );
    return result.rows;
  },

  async remove(id) {
    await db.query("DELETE FROM projects WHERE id = $1", [id]);
  },
};
