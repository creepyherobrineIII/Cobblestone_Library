const librarianController = require('../controllers/librarianController.js');

const router = require('express').Router();

//GET Methods
//Get All librarians
router.get('/', librarianController.getLibrarians)

//Get librarian by id
router.get('/:id', librarianController.getLibrarianById)

//Login librarian
router.get('/librarian-login', librarianController.librarianLogin);


//POST Methods
//Create new Librarian
router.post('/add-librarian', librarianController.addLibrarian);


//PUT Methods
//Update librarian
router.put('/update', librarianController.updateLibrarian);

//DELETE Methods
//Delete librarian
router.delete('/delete', librarianController.deleteLibrarian);

module.exports = router;