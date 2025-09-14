const bookInventoryController = require('../controllers/bookInventoryController.js');

const router = require('express').Router();

//Get book inventory (all)
router.get('/', bookInventoryController.getInventory);

//Get book inventory by id
router.get('/:id', bookInventoryController.getInventoryById);

//Get book inventory by bookid
router.get('/:BookId', bookInventoryController.getInventoryByBookId);

//Add book to inventory
router.post('/addBookToInven', bookInventoryController.addBookToInventory);

//Update inventory
router.put('/update', bookInventoryController.updateInventory);

module.exports = router;