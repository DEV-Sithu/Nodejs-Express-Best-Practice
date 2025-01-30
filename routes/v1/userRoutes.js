const router = require("express").Router();

const { 
    getUsersV1 ,
    createUserV1,
    checkUserV1,
    getUserByUserIdV1,
    updateUsersV1,
    deleteUserV1
} = require('../../controllers/v1/userController.js');

router.get('/users/', getUsersV1); 
router.post("/users/",createUserV1);
router.get("/users/id/:user_id?",  getUserByUserIdV1);
router.put("/users/",  updateUsersV1);
router.delete("/users/", deleteUserV1);
router.post("/users/login", checkUserV1);

module.exports = router;