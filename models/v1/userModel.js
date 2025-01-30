const pool = require("../../config/database");

class User {

  static async create(data) {
    const result = await pool.execute(
     `insert into user
              (user_name, user_password, user_email, user_role) 
              values(?,?,?,?)`,
      [
        data.user_name,
        data.user_password,
        data.user_email,
        data.user_role
      ]
    );
    return result.insertId;
  }

  static async findAll() { 
    return await pool.query('SELECT * FROM user');
  }

  static async findById(id) {
    const result = await pool.execute('SELECT * FROM user WHERE user_id = ?', [id]);
    return result[0];
  }

  static async findByAccount(email,password) {
    const result = await pool.execute('SELECT * FROM user WHERE user_email= ? and user_password', [email,password]);
    return result[0];
  }
  static async findByEmail(email) {
    const result = await pool.execute('SELECT * FROM user WHERE user_email = ?', [email]);
    return result[0];
  }

  static async update( data) {
    await pool.execute(
        `update user set user_name=?, user_password=?, user_role=?, user_email=? where user_id = ?`,
      [
        data.user_name,
        data.user_password,
        data.user_role,
        data.user_email,
        data.user_id
      ],
    );
    return true;
  }

  static async delete(id) {
    await pool.execute('DELETE FROM user WHERE user_id = ?', [id]);
    return true;
  }
}

module.exports = User;