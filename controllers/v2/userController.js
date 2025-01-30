
const {
    service_createUserV2,
    service_loginV2,
    service_getUserByUserIdV2,
    service_getUsersV2,
    service_updateUserV2,
    service_deleteUserV2
  } = require("../services/v2/userServices.js");
  
  
    const createUserV2 = (req, res) => {
  
      const body = req.body;
    
      service_createUserV2(body, (err, results) => {
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
  
    const checkUserV2 =  (req, res) => {
      const body = req.body;
      service_loginV2(body, (err, results) => {
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
  
    const  getUserByUserIdV2 = (req, res) => {
  
      const user_id = req.query.user_id;
  
      service_getUserByUserIdV2(user_id, (err, results) => {
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
  
    const getUsersV2 = (req, res) => {
      service_getUsersV2((err, results) => {
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
  
    const updateUsersV2 = (req, res) => {
  
      const body = req.body;
  
      service_updateUserV2(body, (err, results) => {
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
    
    const deleteUserV2 = (req, res) => {
  
      const user_id = req.body.user_id;
  
      service_deleteUserV2(user_id, (err, results) => {
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
    createUserV2,
    checkUserV2,
    getUserByUserIdV2,
    getUsersV2,
    updateUsersV2,
    deleteUserV2
  }