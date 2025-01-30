const router = require("express").Router();

const userController = require('../../controllers/v1/userController.js');

router.get('/users/', userController.getUsers_v1); 
router.post("/users/",userController.createUser_v1);
router.get("/users/id/:user_id?",  userController.getUserByUserId_v1);
router.put("/users/",  userController.updateUsers_v1);
router.delete("/users/", userController.deleteUser_v1);
router.post("/users/login", userController.checkUser_v1);

module.exports = router;