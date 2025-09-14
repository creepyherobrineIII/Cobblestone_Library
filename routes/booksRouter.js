const booksController = require('../controllers/booksController.js');

const router = require('express').Router();

//Get all books
router.get('/getAllbooks', booksController.getAllBooks);

//Get all books and invetory
router.get('/getBookInven', booksController.getBooksAndInventory);

//Add book to library
router.post('/addBook', booksController.addBook);

module.exports = router;