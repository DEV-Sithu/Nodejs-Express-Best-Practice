const router = require("express").Router();

const { 
    getUsersV2 ,
    createUserV2,
    checkUserV2,
    getUserByUserIdV2,
    updateUsersV2,
    deleteUserV2
} = require('../../controllers/v2/userController.js');

router.get('/', getUsersV2); 
router.post("/",createUserV2);
router.get("/id/:user_id?",  getUserByUserIdV2);
router.put("/",  updateUsersV2);
router.delete("/", deleteUserV2);
router.post("/login", checkUserV2);

module.exports = router;