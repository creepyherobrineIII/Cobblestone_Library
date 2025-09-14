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

//Get Book And Inventory by bookID
const getBAIById = async (req, res) =>{
    try{

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

        let bookInven = req.body.BookInventory;

        console.log(bookInven);
        let bookEntry = await Books.create(newBook, {include: [BookInventory]});

        if (bookEntry !== null || book !== undefined){
            res.status(201).json('Created new book:'+ bookEntry);
        }else{
            res.status(400).json(bookEntry);
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Remove book from library

//Update book details

module.exports = {
    getAllBooks,
    getBooksAndInventory,
    addBook
}