const db = require('../models/modelIndex.js');

const Loans = db.loans;
const Member = db.member;
const Books = db.books;


//Get all loans
const getAllLoans = async (req, res) =>{
    try{
        let dbLoans = await Loans.findAll();

        if (dbLoans.length !== 0){
            res.status(200).json(dbLoans); 
        }else{
            res.status(400).json('No data'); 
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);   
    }
}

//Get loan by id
const getLoansById = async (req, res) =>{
    try{
        let loanId = req.params.id;

        if (loanId > 0){
            let dbLoans = await Loans.findAll({where: {id: loanId}});

            if (dbLoans.length !== 0){
                res.status(200).json(dbLoans);
            }else{
               res.status(400).json('No loan data');   
            }
        }else{
            res.status(400).json('Invalid loan id');  
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);   
    }
}

//Get all loans for one member
const getLoansForMem = async (req, res) =>{
    try{
        let memId = req.params.MemberId;

        if (memId > 0){
            let dbLoans = await Loans.findAll({where: {MemberId: memId}, include: [Member]});

            if (dbLoans.length !== 0){
                res.status(200).json(dbLoans);
            }else{
               res.status(400).json('No loan data');   
            }
        }else{
            res.status(400).json('Invalid member id');  
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);   
    }
}

//Get all loan history for one book
const getLoansForBook = async (req, res) =>{
    try{
        let bookId = req.params.BookId;

        if (bookId > 0){
            let dbLoans = await Loans.findAll({where: {BookId: bookId}, include: [Books]});

            if (dbLoans.length !== 0){
                res.status(200).json(dbLoans);
            }else{
               res.status(400).json('No loan data');   
            }
        }else{
            res.status(400).json('Invalid book id');  
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);   
    }
}

//Create new loan
const createLoan = async (req, res) =>{
    try{
        let newLoan = {
            loanStatus: req.body.loanStatus,
            loanStartDate: req.body.loanStartDate,
            loanDueDate: req.body.loanDueDate,
            loanReturnDate: req.body.ReturnDate,
            loanFee: req.body.loanFee,
            MemberId: req.body.MemberId,
            BookId: req.body.BookId
        };

        if (newLoan !== null || newLoan !== undefined){
            let loanCheck = await Loans.findAll({where: {MemberId: newLoan.MemberId, BookId: newLoan.BookId}});

            if (loanCheck.length === 0){
                let returnedLoan = await Loans.create(newLoan);

                res.status(201).json('Created loan:\n' + returnedLoan); 
            }else{
               res.status(400).json('Loan already exists'); 
            }
        }else{
            res.status(400).json('Incomplete loan data');
        }

    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);   
    }
}

//Update loan
const updateLoan = async (req, res) =>{
    try{
        
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);   
    }
}

//Delete loan
const deleteLoan = async (req, res) =>{
    try{
        let loanId = req.params.id;

        if(loanId > 0){
            let deletedLoan = await Loans.destroy({where: {id: loanId}});

            if (deletedLoan !== null || deletedLoan !== undefined){
                res.status(200).json(deletedLoan);
            }else{
                res.status(400).json('Loan data does not exist');  
            }
        }else{
            res.status(400).json('Invalid loan id');     
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);   
    }
}

module.exports ={
    getAllLoans,
    getLoansById,
    getLoansForMem,
    getLoansForBook,
    createLoan,
    deleteLoan
}