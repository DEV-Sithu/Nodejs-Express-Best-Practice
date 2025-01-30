const jwt = require('jsonwebtoken');
const User = require('../../models/v1/userModel');

module.exports = {
  loginUser: async (email, password) => {
    const user = await User.findByAccount(email, password );
    if (!user) throw new Error('User not found');
    
    const isValid = await bcrypt.compare(password, user.user_password);
    if (!isValid) throw new Error('Invalid password');

    const token = jwt.sign({ id: user.user_id, username: user.email }, process.env.JWT_SECRET, { expiresIn });
    return token;
  },

  registerUser: async ( user_email, user_password,user_name,user_role) => {
    const existingUser = await User.findByAccount( user_email ,user_password);
    if (existingUser) throw new Error('Username already exists');
    
    const user = new User( user_name, user_password ,user_email,user_role);
    await user.save();
    return user;
  }
};