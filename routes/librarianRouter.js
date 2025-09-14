const librarianController = require('../controllers/librarianController.js');

const router = require('express').Router();

//Get All librarians
router.get('/', librarianController.getLibrarians)

//Get librarian by id
router.get('/:id', librarianController.getLibrarianById)

//Create new Librarian
router.post('/addLibrarian', librarianController.addLibrarian);

//Login librarian
router.get('/librarianLogin', librarianController.librarianLogin);

//Update librarian
router.put('/update', librarianController.updateLibrarian);

//Delete librarian
router.delete('/delete', librarianController.deleteLibrarian);

module.exports = router;