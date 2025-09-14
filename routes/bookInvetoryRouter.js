const bookInventoryController = require('../controllers/bookInventoryController.js');

const router = require('express').Router();

//Get book inventory (all)
router.get('/getInventory', bookInventoryController.getInventory);

//Get book inventory id

//Add book to inventory
router.post('addBookToInven', bookInventoryController.addBookToInventory);

module.exports = router;