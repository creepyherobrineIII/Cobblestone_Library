const memberController = require('../controllers/memberController.js');

const router = require('express').Router();

//GET Methods
//Get all members
router.get('/', memberController.getAllMembers);

//Get member by Id
router.get('/byId/:id', memberController.getMemberById);

//Login member
router.get('/member-login', memberController.memberLogin);

//POST Methods
//Create new member
router.post('/create-member', memberController.createMember);

//PUT Methods
router.put('/update', memberController.updateMember)

//DELETE Methods
router.delete('/delete', memberController.delMember)


module.exports = router;