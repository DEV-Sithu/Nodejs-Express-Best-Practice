const router = require("express").Router();

const { 
    getUsersV1 ,
    createUserV1,
    checkUserV1,
    getUserByUserIdV1,
    updateUsersV1,
    deleteUserV1
} = require('../controllers/v1/userController');

router.get('/', getUsersV1); 
router.post("/",createUserV1);
router.get("/id/:user_id?",  getUserByUserIdV1);
router.put("/",  updateUsersV1);
router.delete("/", deleteUserV1);
router.post("/login", checkUserV1);

module.exports = router;