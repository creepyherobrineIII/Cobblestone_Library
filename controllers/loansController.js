const db = require('../models/modelIndex.js');
const { Op } = require('sequelize');

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
            loanStartDate: req.body.loanStartDate,
            MemberId: req.body.MemberId,
            BookISBN: req.body.BookISBN
        };


        if (newLoan !== undefined){

            //Check if reservation exists, then delete it
            let resCheck = await Reservations.findOne({where: {BookISBN: newLoan.BookISBN, MemberId: newLoan.MemberId, resDateDeleted: null}});


            //Check if member has overdue loans
            let overDueLoansCheck = await Loans.findAll({where: {MemberId: newLoan.MemberId, 
                        loanStatus: { 
                            [Op.in]: ['Returned: Overdue - Not paid', 'Loaned: Overdue']
                        }}});

            //Check if has existing loan on specific book
            let loanCheck = await Loans.findOne({where: {
                BookISBN: newLoan.BookISBN, 
                MemberId: newLoan.MemberId,
                loanStatus: { 
                    [Op.in]: ['Loaned', 'Loaned: Overdue']
                }}})


            //Check if loan already exists

            if (overDueLoansCheck.length === 0){
                if (resCheck === null && loanCheck !== null ){
                    res.status(401).json('Member is already loaning the book'); 
                }

                if (resCheck === null && loanCheck === null){
                    res.status(401).json('Book needs to be reserved first'); 
                }

                if (resCheck !== null && loanCheck === null){

                    //Creating due date for book loan (in two weeks time)
                    let startDate = new Date(newLoan.loanStartDate);

                    let dueDate = new Date(startDate);

                    returnDate.setDate(startDate.getDate() + 14);

                    newLoan.loanDueDate = dueDate;

                    //Creating new loan entry
                    let returnedLoan = await Loans.create(newLoan);

                    await Reservations.destroy({where: {BookISBN: newLoan.BookISBN, MemberId: newLoan.MemberId}})

                    res.status(201).json(returnedLoan);
                }
            }else{
                res.status(401).json('Member has overdue loans: Cannot loan book'); 
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
        let updatedLoan = {
            id: req.body.id,
            loanStatus: req.body.loanStatus,
            loanFee: req.body.loanFee,
            loanReturnDate: req.body.loanReturnDate
        }

        if (updatedLoan !== null){
            let loanUp = await Loans.update(updatedLoan, {where: {id: updatedLoan.id}, returning: true});

            if(loanUp[1] !== 0){
                res.status(201).json('Updated loan');
            }else{
                res.status(400).json('Could not update loan details'); 
            }
        }else{
            res.status(400).json('Error in getting request body'); 
        }
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

            let loanRec = await Loans.findOne({where: {id: loanId}})

            let outstandingLoan = false;

            switch(loanRec.loanStatus){
                case 'Loaned':  outstandingLoan = true;

                case 'Loaned: Overdue': outstandingLoan = true;

                case 'Returned: Overdue - Not paid': outstandingLoan = true;

                case 'Returned: Not Overdue': outstandingLoan = false;
                
                case 'Returned: Overdue - Paid': outstandingLoan = false;

                default: outstandingLoan = true; 
            }

            if (outstandingLoan){
                res.status(401).json('Loan data cannot be deleted: Outstanding loan/fees')
            }else{
                
                let deletedLoanCount = await Loans.destroy({where: {id: loanId}});

                if (deletedLoanCount > 0){
                    res.status(200).json(deletedLoanCount);
                }else{
                    res.status(400).json('Loan data does not exist');  
                }
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
    updateLoan,
    deleteLoan
}