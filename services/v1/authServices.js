const jwt = require('jsonwebtoken');
const User = require('../../models/v1/userModel');
const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = {
  loginUser: async (email, password ) => {
    const user = await User.findByAccount(email, password );
    if (!user) throw new Error('User not found');
      // 2. Verify passwords are defined
    if (!password || !user.password) throw new Error('Invalid credentials ='+user.password)
    console.log("data="+user.password);
    const isValid = await bcrypt.compare(password, user.password);
    //if (!isValid) throw new Error('Invalid password');

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES_IN });
    return token;
  },

  registerUser: async ( email,password,user_name,role) => {
    const existingUser = await User.findByAccount( email ,password);
    if (existingUser) throw new Error('Username already exists');
    
    const user = new User( user_name, password ,email,role);
    await user.save();
    return user;
  }
};