const authService = require('../../services/v1/authServices.js');

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await authService.loginUser(email, password);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authService.registerUser(email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};