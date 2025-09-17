const bookInventoryController = require('../controllers/bookInventoryController.js');

const router = require('express').Router();

//GET Methods
//Get book inventory (all)
router.get('/', bookInventoryController.getInventory);

//Get book inventory by id
router.get('/byId/:id', bookInventoryController.getInventoryById);

//Get book inventory by bookid
router.get('/book-id/:BookId', bookInventoryController.getInventoryByBookId);



//POST Methods
//Add book to inventory
router.post('/add-book-to-inventory', bookInventoryController.addBookToInventory);



//PUT Methods
//Update inventory
router.put('/update', bookInventoryController.updateInventory);

//DELETE Methods

module.exports = router;