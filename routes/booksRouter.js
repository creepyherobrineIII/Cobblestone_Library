const booksController = require('../controllers/booksController.js');

const router = require('express').Router();

//GET Methods

//Get all books
router.get('/', booksController.getAllBooks);

//Get all books and invetory
router.get('/inventory', booksController.getBooksAndInventory);

//Get book by id
router.get('/byId/:id', booksController.getBookById)

//Get book & inventory by id
router.get('get-BAI-by-id/:id', booksController.getBAIById)


//POST Methods
//Add book to library
router.post('/add-book', booksController.addBook);


//PUT Methods
//Update book details
router.put('/update', booksController.updateBook);


//DELETE Methods
//Delete book
router.delete('/delete/:id', booksController.deleteBook);

module.exports = router;