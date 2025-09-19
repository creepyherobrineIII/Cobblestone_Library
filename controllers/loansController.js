const db = require('../models/modelIndex.js');

const Loans = db.loans;
const Member = db.member;
const Books = db.books;
const Reservations = db.reservations;

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

        if (memId !== null){
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
        let loanBookISBN = req.params.BookISBN;

        if (loanBookISBN.length === 13 && loanBookISBN !== null){
            let dbLoans = await Loans.findAll({where: {BookISBN: loanBookISBN}, include: [Books]});

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

//Create new loan (Needs to check: If loan )
const createLoan = async (req, res) =>{
    try{
        let newLoan = {
            loanStatus: req.body.loanStatus,
            loanStartDate: req.body.loanStartDate,
            loanDueDate: req.body.loanDueDate,
            loanFee: req.body.loanFee,
            MemberId: req.body.MemberId,
            BookISBN: req.body.BookISBN
        };


        if (newLoan !== undefined){

            //Check if reservation exists, then delete it
            let resCheck = await Reservations.findOne({where: {BookISBN: newLoan.BookISBN, MemberId: newLoan.MemberId}});


            if (resCheck !== null){
                let returnedLoan = await Loans.create(newLoan);

                res.status(201).json('Created loan:\n' + returnedLoan); 
            }else{
               res.status(400).json('Loan already exists'); 
            }
        }else{
            res.status(400).json('Error in getting request body');
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
            let deletedLoanCount = await Loans.destroy({where: {id: loanId}});

            if (deletedLoanCount > 0){
                res.status(200).json(deletedLoanCount);
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