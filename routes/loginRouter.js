const loginController = require('../controllers/loginController.js');

const router = require('express').Router();

//GET Methods
//Login user

router.post('/', loginController.userLogin);

module.exports = router;