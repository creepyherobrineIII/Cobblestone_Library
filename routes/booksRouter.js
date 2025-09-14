const booksController = require('../controllers/booksController.js');

const router = require('express').Router();

//Get all books
router.get('/', booksController.getAllBooks);

//Get all books and invetory
router.get('/Inventory', booksController.getBooksAndInventory);

//Get book by id
router.get('/:id', booksController.getBookById)

//Get book & inventory by id
router.get('getBAIById/:id', booksController.getBAIById)

//Add book to library
router.post('/addBook', booksController.addBook);

//Update book details
router.put('/update', booksController.updateBook);

//Delete book
router.delete('/delete/:id', booksController.deleteBook);

module.exports = router;