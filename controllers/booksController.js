const db = require('../models/modelIndex.js');
const Books = db.books;
const BookInventory = db.bookInventory;

//Get all books
const getAllBooks = async (req, res) =>{
    try{
        let resBooks = await Books.findAll();

        if(resBooks !== null || resBooks !== undefined){
            res.status(200).json(resBooks)
        }else{
            res.status(400).json('Missing data')
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Get all books and inventory
const getBooksAndInventory = async (req, res) =>{
    try{
        let booksAndInven = await Books.findAll({include: BookInventory});

        if(booksAndInven !== null || booksAndInven !== undefined){
            res.status(200).json(booksAndInven)
        }else{
            res.status(400).json('Missing data')
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Get Book by id
const getBookById = async (req, res) =>{
    try{
        let bookId = req.params.id;

        let reqBook = await Books.findOne({where: {id: bookId}});

        if (reqBook !== null || reqBook !== undefined){
            res.status(200).json(reqBook)
        }else{
            res.status(400).json('Book does not exist')
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Get Book And Inventory by ID (TEST)
const getBAIById = async (req, res) =>{
    try{
        let bookId = req.params.id;

        let reqBook = await Books.findOne({where: {id: bookId}, include: BookInventory});

        if (reqBook !== null || reqBook !== undefined){
            res.status(200).json(reqBook)
        }else{
            res.status(400).json('Book does not exist')
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Add book to library
const addBook = async (req, res) =>{
    try{
        let newBook = {
            ISBN: req.body.ISBN,
            bookTitle: req.body.bookTitle,
            author: req.body.author,
            genre: req.body.genre,
            subgenre: req.body.subgenre,
            pubDate: req.body.pubDate,
            edition: req.body.edition,
            publisher: req.body.publisher,
            bookDescription: req.body.bookDescription,
            picture: req.body.picture,
            BookInventory: req.body.BookInventory
        };

        let bookConf = await Books.findAll({where: {ISBN: newBook.ISBN}});

        if (bookConf == null || bookConf == undefined)
        {
            let bookEntry = await Books.create(newBook, {include: [BookInventory]});

            if (bookEntry !== null || book !== undefined){
                res.status(201).json('Created new book:'+ bookEntry);
            }else{
                res.status(400).json('Could not create new book');
            }

        }else{
            res.status(400).json('Book already exists in database');
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Update book details
const updateBook = async (req, res) =>{
   try{
        let bookUpdate = {
            id: req.body.id,
            ISBN: req.body.ISBN,
            bookTitle: req.body.bookTitle,
            author: req.body.author,
            genre: req.body.genre,
            subgenre: req.body.subgenre,
            pubDate: req.body.pubDate,
            edition: req.body.edition,
            publisher: req.body.publisher,
            bookDescription: req.body.bookDescription,
            picture: req.body.picture
        };

        let bookConf = await Books.update(bookUpdate, {where: {id: bookUpdate.id}});

        if (bookConf !== null || bookConf !== undefined){
            res.status(201).json('Updated book details');
        }else{
            res.status(400).json('Unable to update book');
        }
   }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
   }
}

//Remove book from library
const deleteBook = async (req, res) =>{
   try{
        let bookToDel = req.params.id

        let deletedBook = await Books.destroy({where: {id: bookToDel}});

        if (deletedBook !== null || deletedBook !== undefined){
            res.status(200).json(deletedBook);
        }else{
            res.status(400).json('Cannot delete book');  
        }
   }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
   }
}

module.exports = {
    getAllBooks,
    getBooksAndInventory,
    getBookById,
    getBAIById,
    addBook,
    updateBook,
    deleteBook
}