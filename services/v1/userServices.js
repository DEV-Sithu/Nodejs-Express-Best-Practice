const user = require('../../models/v1/userModel');

class UserService {
  static async createUser_v1(userData) {
    const existingUser = await user.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    return user.create(userData);
  }

  static async login_v1(email,password) {
    return user.findByAccount(email,password);
  }

  static async getUserByUserId_v1(id) {
    return user.findById(id);
  }

  static async getUsers_v1() {
    return user.findAll();
  }

  static async updateUser_v1(userData) {
    return user.update(userData);
  }

  static async deleteUser_v1(id) {
    return user.delete(id);
  }
}
module.exports = UserService;
