const db = require("../config/db.js");
const schema = require("../models/taskModel.js");

async function validate(data) {
  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
  return value;
}

module.exports = {
  async create(task) {
    task = await validate(task);

    // Verificar se o usuário existe
    const userCheck = await db.query("SELECT id FROM users WHERE id = $1", [
      task.user_id,
    ]);
    if (userCheck.rows.length === 0) {
      throw new Error("User not found");
    }

    // Verificar se o projeto existe e pertence ao usuário (SOMENTE SE project_id não for null)
    if (task.project_id) {
      const projectCheck = await db.query(
        "SELECT id FROM projects WHERE id = $1 AND user_id = $2",
        [task.project_id, task.user_id]
      );
      if (projectCheck.rows.length === 0) {
        throw new Error("Project not found or does not belong to user");
      }
    }

    const result = await db.query(
      `INSERT INTO tasks
        (task_name, task_description, due_date, due_time, has_notification, task_priority, is_completed, project_id, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        task.task_name,
        task.task_description,
        task.due_date,
        task.due_time,
        task.has_notification ?? false,
        task.task_priority,
        task.is_completed ?? false,
        task.project_id, // Pode ser null agora
        task.user_id,
      ]
    );
    return { ...task, id: result.rows[0].id };
  },

  async findAll() {
    const result = await db.query(
      `SELECT id, task_name, task_description, due_date, due_time, has_notification, task_priority, is_completed, project_id, user_id
       FROM tasks`
    );
    return result.rows;
  },

  async findByID(id) {
    const result = await db.query(
      `SELECT id, task_name, task_description, due_date, due_time, has_notification, task_priority, is_completed, project_id, user_id
       FROM tasks
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  // Buscar tarefas por usuário
  async findByUserId(userId) {
    const result = await db.query(
      `SELECT id, task_name, task_description, due_date, due_time, has_notification, task_priority, is_completed, project_id, user_id
       FROM tasks
       WHERE user_id = $1
       ORDER BY id DESC`,
      [userId]
    );
    return result.rows;
  },

  // Buscar tarefas por projeto
  async findByProjectId(projectId) {
    const result = await db.query(
      `SELECT id, task_name, task_description, due_date, due_time, has_notification, task_priority, is_completed, project_id, user_id
       FROM tasks
       WHERE project_id = $1
       ORDER BY id DESC`,
      [projectId]
    );
    return result.rows;
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

    // Verificar se o projeto existe e pertence ao usuário (SOMENTE SE project_id não for null)
    if (payload.project_id) {
      const projectCheck = await db.query(
        "SELECT id FROM projects WHERE id = $1 AND user_id = $2",
        [payload.project_id, payload.user_id]
      );
      if (projectCheck.rows.length === 0) {
        throw new Error("Project not found or does not belong to user");
      }
    }

    await db.query(
      `UPDATE tasks 
       SET task_name = $1,
           task_description = $2,
           due_date = $3,
           due_time = $4,
           has_notification = $5,
           task_priority = $6,
           is_completed = $7,
           project_id = $8,
           user_id = $9
       WHERE id = $10`,
      [
        payload.task_name,
        payload.task_description,
        payload.due_date,
        payload.due_time,
        payload.has_notification ?? false,
        payload.task_priority,
        payload.is_completed ?? false,
        payload.project_id, // Pode ser null agora
        payload.user_id,
        id,
      ]
    );
    return this.findByID(id);
  },

  async remove(id) {
    await db.query("DELETE FROM tasks WHERE id = $1", [id]);
  },
};
