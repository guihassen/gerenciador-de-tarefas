const db = require("../config/db");
const schema = require("../models/userModel.js");

async function validate(data) {
  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
  return value;
}

module.exports = {
  async create(user) {
    user = await validate(user);
    const result = await db.query(
      `INSERT INTO users (full_name, username, profession, password_hash, email, is_active)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        user.full_name,
        user.username,
        user.profession,
        user.password_hash,
        user.email,
        user.is_active ?? true,
      ]
    );
    return { ...user, id: result.rows[0].id };
  },

  async findAll() {
    const result = await db.query(
      `SELECT id, full_name, username, profession, email, is_active FROM users`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT id, full_name, username, profession, email, is_active
       FROM users
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async update(id, payload) {
    payload = await validate(payload);
    await db.query(
      `UPDATE users
       SET full_name = $1,
           username = $2,
           profession = $3,
           password_hash = $4,
           email = $5,
           is_active = $6
       WHERE id = $7`,
      [
        payload.full_name,
        payload.username,
        payload.profession,
        payload.password_hash,
        payload.email,
        payload.is_active ?? true,
        id,
      ]
    );
    return this.findById(id);
  },

  async remove(id) {
    await db.query(`DELETE FROM users WHERE id = $1`, [id]);
  },

  async withOrderTotals() {
    const result = await db.query(`
      SELECT u.id, u.full_name, u.username, u.email,
             COALESCE(SUM(o.price), 0) AS total
      FROM users u
      LEFT JOIN orders o ON o.user_id = u.id
      GROUP BY u.id
    `);
    return result.rows;
  },
};
