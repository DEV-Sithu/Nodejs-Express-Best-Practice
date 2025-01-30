const pool = require("../../config/database");

module.exports = {
  service_createUserV2: (data, callBack) => {
    pool.query(
      `insert into user(user_name, user_password, user_role, isLogin,isRoomService,isRoom,isMenus,isExpense,isReport,isSetting,isHistory,isVoucherDelete,isVoucherEdit) 
                values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.user_name,
        data.user_password,
        data.user_role,
        data.isLogin,
        data.isRoomService,
        data.isRoom,
        data.isMenus,
        data.isExpense,
        data.isReport,
        data.isSetting,
        data.isHistory,
        data.isVoucherDelete,
        data.isVoucherEdit

      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  service_loginV2: (data, callBack) => {

    pool.query(
      `select * from user where user_name = ? and user_password = ?`,
      [
        data.user_name,
        data.user_password
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
       return callBack(null, results);
      }
    );
  },

  service_getUserByUserIdV2: (user_id, callBack) => {
    pool.query(
      `select * from user where user_id = ?`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  service_getUsersV2: callBack => {
    pool.query(
      `select * from user `,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  service_updateUserV2: (data, callBack) => {
    pool.query(
      `update user set user_name=?, user_password=?, user_role=?, isLogin=?,isRoomService=?,isRoom=?,isMenus=?,isExpense=?,isReport=?,isSetting=?,isHistory=?,isVoucherDelete=?,isVoucherEdit=? where user_id = ?`,
      [
        data.user_name,
        data.user_password,
        data.user_role,
        data.isLogin,
        data.isRoomService,
        data.isRoom,
        data.isMenus,
        data.isExpense,
        data.isReport,
        data.isSetting,
        data.isHistory,
        data.isVoucherDelete,
        data.isVoucherEdit,
        data.user_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  service_deleteUserV2: (user_id, callBack) => {
    pool.query(
      `delete from user where user_id = ?`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};