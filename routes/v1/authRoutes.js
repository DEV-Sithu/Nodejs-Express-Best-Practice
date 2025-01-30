const router = require("express").Router();
const authController = require('../../controllers/v1/authController.js');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

module.exports = router;