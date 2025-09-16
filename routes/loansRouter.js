const loansController = require('../controllers/loansController.js');

const router = require('express').Router();

//GET Methods
//Get all loans
router.get('/', loansController.getAllLoans);

//Get loan by Id
router.get('/:id', loansController.getLoansById);

//Get all loans for one member by member ID
router.get('/member-id/:MemberId', loansController.getLoansForMem);

//Get all loans for a book by book id
router.get('/book-id/:BookId', loansController.getLoansForBook);

//POST Methods
//Create a loan

//PUT Methods
//Update a loan

//DELETE Methods
//Delete a loan
router.delete('delete/:id', loansController.deleteLoan);

module.exports = router;