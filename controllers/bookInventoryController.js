const db = require('../models/modelIndex.js');
const BookInventory = db.bookInventory;

//Get Inventory
const getInventory = async (req, res) => {
    try{
        let bookInven = await BookInventory.findAll();

        if (bookInven !== null || bookInven !== undefined){
            res.status(200).json(bookInven);
        }else{
            res.status(400).json('Missing data')
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
};

//Get inventory by Id


//Add book to inventory
const addBookToInventory = async (req, res) =>{
    try{
        let newBook = {
            totalCopies: req.body.totalCopies,
            availableCopies: req.body.availableCopies,
            BookId: req.body.BookId
        }

        let addedBook = await BookInventory.create(newBook);

        if (addedBook !== null || addedBook !== undefined){
            res.status(201).json(addedBook);
        }else{
            res.status(400).json('Unable to add book');
        }
    }catch(error)
    {
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Delete book from inventory

//Update book invetory

module.exports = {
    getInventory,
    addBookToInventory
};