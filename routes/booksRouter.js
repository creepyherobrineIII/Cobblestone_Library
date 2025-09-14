const booksController = require('../controllers/booksController.js');

const router = require('express').Router();

//Get all books
router.get('/getAllbooks', booksController.getAllBooks);

//Get all books and invetory
router.get('/getBookInven', booksController.getBooksAndInventory);

//Get book by id
router.get('getBookById/:id', booksController.getBookById)

//Get book & inventory by BookId
router.get('getBAIById/:id', booksController.getBAIById)

//Add book to library
router.post('/addBook', booksController.addBook);

//Update book details
router.put('/update', booksController.updateBook);

//Delete book
router.delete('/delete', booksController.deleteBook);

module.exports = router;