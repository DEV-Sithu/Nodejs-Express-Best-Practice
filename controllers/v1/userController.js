
const {
    service_createUserV1,
    service_loginV1,
    service_getUserByUserIdV1,
    service_getUsersV1,
    service_updateUserV1,
    service_deleteUserV1
  } = require('/../services/v1/userServices.js');
  
  
    const createUserV1 = (req, res) => {
  
      const body = req.body;
    
      service_createUserV1(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    }
  
    const checkUserV1 =  (req, res) => {
      const body = req.body;
      service_loginV1(body, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Invalid username or password",
            data: results
          });
        }
          return res.json({
            success: 1,
            message: "login successfully",
            data: results
          });
          
      });
    }
  
    const  getUserByUserIdV1 = (req, res) => {
  
      const user_id = req.query.user_id;
  
      service_getUserByUserIdV1(user_id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
    
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    }
  
    const getUsersV1 = (req, res) => {
      service_getUsersV1((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    }
  
    const updateUsersV1 = (req, res) => {
  
      const body = req.body;
  
      service_updateUserV1(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    }
    
    const deleteUserV1 = (req, res) => {
  
      const user_id = req.body.user_id;
  
      service_deleteUserV1(user_id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          message: "user deleted successfully"
        });
  
      });
    }
  
  
  module.exports = {
    createUserV1,
    checkUserV1,
    getUserByUserIdV1,
    getUsersV1,
    updateUsersV1,
    deleteUserV1
  }