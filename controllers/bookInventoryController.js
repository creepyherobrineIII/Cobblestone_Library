const db = require('../models/modelIndex.js');
const BookInventory = db.bookInventory;

//Get Inventory
const getInventory = async (req, res) => {
    try{
        let bookInven = await BookInventory.findAll();

        if (bookInven.length !== 0){
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
const getInventoryById = async (req, res) => {
    try{
        let inventoryId = req.params.id;

        if(inventoryId > 0){
            let bookInven = await BookInventory.findAll({where: {id: inventoryId}});

            if (bookInven.length !== 0){
                res.status(200).json(bookInven);
            }else{
                res.status(400).json('Missing data')
            }
        }else{
            res.status(400).json('Inventory yet to be entered')
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
};

//Get Inventory by BookId
const getInventoryByBookId = async (req, res) => {
    try{
        let reqBookId = req.params.BookId;

        if(reqBookIdId > 0){
            let bookInven = await BookInventory.findAll({where: {BookId: reqBookId}});

            if (bookInven.length !== 0){
                res.status(200).json(bookInven);
            }else{
                res.status(400).json('Missing data')
            }
        }else{
            res.status(400).json('Inventory yet to be entered')
        }
        
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
};

//Add book copies to inventory
const addBookToInventory = async (req, res) =>{
    try{
        let newBook = {
            totalCopies: req.body.totalCopies,
            availableCopies: req.body.availableCopies,
            BookId: req.body.BookId
        }

        let bookInvenCheck = await BookInventory.findAll({where: {BookId: newBook.BookId}});

        if (bookInvenCheck.length === 0){
            
            let addedBook = await BookInventory.create(newBook);

            if (addedBook !== null || addedBook !== undefined){
                res.status(201).json(addedBook);
            }else{
                res.status(400).json('Unable to add book');
            }
        }else{
            res.status(401).json('Book already has inventory');
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

        let updatedInvRec = await BookInventory.update(reqUpdatedInven, {where: {id: reqUpdatedInven.id}, returning: true});

        if (updatedInvRec[1] !== 0){
            res.status(201).json('Updated book inventory');
        }else{
            res.status(400).json(error.message);
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}


module.exports = {
    getInventory,
    getInventoryById,
    getInventoryByBookId,
    addBookToInventory,
    updateInventory
};