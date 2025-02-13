const pool = require('../config/database');

class User {
  static async findOne(username) {
    const [rows] = await pool.promise().query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.promise().query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(userData) {
    const { username, password, role } = userData;
    const [result] = await pool.promise().query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role]
    );
    return result.insertId;
  }
}

module.exports = User; 