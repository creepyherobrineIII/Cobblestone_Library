const memberController = require('../controllers/memberController.js');

const router = require('express').Router();

//GET Methods
//Get all members
router.get('/', memberController.getAllMembers);

//Get member by Id
router.get('/:id', memberController.getMemberById);

//Login member
router.get('/member-login', memberController.memberLogin);

//POST Methods
//Create new member
router.post('/create-member', memberController.createMember);

//PUT Methods

//DELETE Methods



module.exports = router;