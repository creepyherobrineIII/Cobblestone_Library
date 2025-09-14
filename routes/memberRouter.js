const memberController = require('../controllers/memberController.js');

const router = require('express').Router();

//Get all members
router.get('/', memberController.getAllMembers);

//Create new member
router.post('/createMember', memberController.createMember);

//Login member
router.get('/memberLogin', memberController.memberLogin)


module.exports = router;