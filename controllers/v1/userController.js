
const userService  = require('../../services/v1/userServices.js');
  
module.exports.createUser_v1 = async (req, res, next) => {
  try {
    const results = await userService.createUser_v1(req.body);
    res.status(200).json({
          success: 1,
          data: results
    });
  } catch (error) {
    next(error);
  }
};

module.exports.checkUser_v1 = async (req, res, next) => {
  try {
    const results = await userService.login_v1(req.body);
    res.status(200).json({
      success: 1,
          data: results
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserByUserId_v1 = async (req, res, next) => {
  try {
    const user_id = req.query.user_id;
    const results = await userService.getUserByUserId_v1(user_id);
    res.status(200).json({
      success: 1,
          data: results
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers_v1 = async (req, res, next) => {
  try {
    const results = await userService.getUsers_v1(req.body);
    res.status(200).json({
          success: 1,
          data: results
    });
  } catch (error) {
    next(error);
  }
};
  
module.exports.updateUsers_v1 = async (req, res, next) => {
  try {
    await userService.updateUser_v1(req.body);
    res.status(200).json({
          success: 1,
          message: " update successfully "
    });
  } catch (error) {
    next(error);
  }
};
  
module.exports.deleteUser_v1 = async (req, res, next) => {
  try {
    const user_id = req.body.user_id;
    await userService.updateUser_v1(user_id);
    res.status(200).json({
          success: 1,
          message: " deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};   
  
  
  
  