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

//Get Inventory by BookId

//Add book to inventory
const addBookToInventory = async (req, res) =>{
    try{
        let newBook = {
            totalCopies: req.body.totalCopies,
            availableCopies: req.body.availableCopies,
            BookId: req.body.BookId
        }

        let bookInvenCheck = await BookInventory.findAll({where: {BookId: newBook.BookId}});

        if (bookInvenCheck == null || bookInvenCheck == undefined){
            
            let addedBook = await BookInventory.create(newBook);

            if (addedBook !== null || addedBook !== undefined){
                res.status(201).json(addedBook);
            }else{
                res.status(400).json('Unable to add book');
            }
        }else{
            res.status(401).json('Book has inventory');
        }
    }catch(error)
    {
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Update book invetory
const updateInventory = async (req, res) =>{
    try{
        let reqUpdatedInven = {
            id: req.body.id,
            totalCopies: req.body.totalCopies,
            availableCopies: req.body.availableCopies
        };

        let updatedInvRec = await BookInventory.update(reqUpdatedInven, {where: {id: reqUpdatedInven.id}});

        if ()
    }catch(error){

    }
}
module.exports = {
    getInventory,
    addBookToInventory
};