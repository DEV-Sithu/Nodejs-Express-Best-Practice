const pool = require("../../config/database");

class User {

  static async create(data) {
    const result = await pool.execute(
     `insert into user
              (user_name, password, email, role) 
              values(?,?,?,?)`,
      [
        data.user_name,
        data.password,
        data.email,
        data.role
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
    const result = await pool.execute('SELECT * FROM user WHERE email= ? and password', [email,password]);
    return result[0];
  }
  static async findByEmail(email) {
    const result = await pool.execute('SELECT * FROM user WHERE email = ?', [email]);
    return result[0];
  }

  static async update( data) {
    await pool.execute(
        `update user set user_name=?, password=?, role=?, email=? where user_id = ?`,
      [
        data.user_name,
        data.password,
        data.role,
        data.email,
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