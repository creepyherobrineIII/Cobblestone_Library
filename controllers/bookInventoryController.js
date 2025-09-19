const db = require('../models/modelIndex.js');
const BookInventory = db.bookInventory;

//Get Inventory (active inventory)
const getInventory = async (req, res) => {
    try{
        let bookInven = await BookInventory.findAll();

        if (bookInven.length !== 0){
            res.status(200).json(bookInven);
        }else{
            res.status(400).json('No book inventory')
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
};

//Get Inventory (past and present)

//Get inventory by Id
const getInventoryById = async (req, res) => {
    try{
        let inventoryId = req.params.id;

        if(inventoryId > 0){
            let bookInven = await BookInventory.findAll({where: {id: inventoryId}});

            if (bookInven.length !== 0){
                res.status(200).json(bookInven);
            }else{
                res.status(400).json('Could not get book inventory')
            }
        }else{
            res.status(400).json('Inventory yet to be entered')
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
};

//Get Inventory by BookISBN
const getInventoryByISBN = async (req, res) => {
    try{
        let reqBookISBN = req.params.BookISBN;

        console.log(reqBookISBN);

        if(reqBookISBN.length === 13 && reqBookISBN !== null){
            let bookInven = await BookInventory.findAll({where: {BookISBN: reqBookISBN}});

            if (bookInven.length !== 0){
                res.status(200).json(bookInven);
            }else{
                res.status(400).json('Could not get book inventory')
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
            BookISBN: req.body.BookISBN
        }

        let bookInvenCheck = await BookInventory.findAll({where: {BookISBN: newBook.BookISBN}});

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
            BookISBN: req.body.BookISBN,
            totalCopies: req.body.totalCopies,
            availableCopies: req.body.availableCopies
        };

        let updatedInvRec = await BookInventory.update(reqUpdatedInven, {where: {BookISBN: reqUpdatedInven.BookISBN}, returning: true});

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
    getInventoryByISBN,
    addBookToInventory,
    updateInventory
};