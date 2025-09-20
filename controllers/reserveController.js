const db = require('../models/modelIndex.js');
const Reservations = db.reservations;
const BookInventory = db.bookInventory;
const Loans = db.loans;

//Get all reservations
const getAllReservations = async (req, res) =>{
    try{
        let reservations = await Reservations.findAll();

        if (reservations.length !== 0)
        {
            res.status(200).json(reservations);
        }else{
            res.status(400).json('No data');
        }
    }catch (error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Get reservation by Id
const getReservationById = async (req, res) =>{
    try{
        let reserveId = req.params.id;

        if(reserveID > 0)
        {
            let reserveRec = await Reservations.findOne({where: {id: reserveId}});

            if (reserveRec !== null){
                res.status(200).json(reserveRec);
            }else{
                res.status(400).json('Reservation does not exist');
            }
  
        }else{
            res.status(400).json('Incorrect ID Value');
        }
    }catch (error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }

}

//Get reservations by BookISBN
const getReservationByBook = async (req, res) =>{
    try{
        let bookISBN = req.params.BookISBN;

        if (bookISBN.length === 13)
        {
            let reserveRec = await Reservations.findAll({where: {BookISBN: bookISBN}});

            if (reserveRec.length !== 0){
                res.status(200).json(reserveRec);
            }else{
                res.status(400).json('Reservation does not exist');
            }
        }else{
            res.status(400).json('Incorrect ISBN Value');
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Get reservations by MemberId
const getReservationByMemId = async (req, res) =>{
    try{
        let memId = req.params.MemberId;

        if(memId !== undefined)
        {
            let reserveRec = await Reservations.findAll({where: {MemberId: memId}});

            if (reserveRec.length !== 0){
                res.status(200).json(reserveRec);
            }else{
                res.status(400).json('Reservation does not exist');
            }
  
        }else{
            res.status(400).json('Incorrect ID Value');
        }
    }catch (error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }

}

//Post reservation 
const createReservation = async (req, res) =>{
   try{
     let newReservation = {
        resDateExpiry: req.body.resDateExpiry,
        MemberId: req.body.MemberId,
        BookISBN: req.body.BookISBN
    };

    if (newReservation !== undefined){

        //Checks
            //Check if reservations already exists
        let reserveCheck = await Reservations.findOne({where: {MemberId: newReservation.MemberId, BookISBN: newReservation.BookISBN}});

            //Getting book inventory
        let bookInven = await BookInventory.findOne({where: {BookISBN: newReservation.BookISBN}});

            //Checking for loans already made by the member for the requested book
        let loanCheck = await Loans.findOne({where: {MemberId: newReservation.MemberId, BookISBN: newReservation.BookISBN}})

            //Checking for overdue loans 
        let overDueLoansCheck = await Loans.findAll({where: {MemberId: newLoan.MemberId, 
                        loanStatus: { 
                            [Op.in]: ['Returned: Overdue - Not paid', 'Loaned: Overdue']
                        }}});

        if (overDueLoansCheck.length !== 0){
            res.status(401).json('Member has overdue loans: Cannot reserve any books');
        }

        if (reserveCheck !== null){
            res.status(401).json('A reservation for this book under this member has already been made');
        }

        if (loanCheck !== null){
            res.status(401).json('Loan for this book under this member already exists. Cannot reserve again');
        }

        if(bookInven !== null && reserveCheck === null && loanCheck === null){
            if(bookInven.availableCopies > 0){
                let createdRes = await Reservations.create(newReservation);

                if (createdRes !== null){
                    //Only deduct from available copies if the CREATE was succesful
                    bookInven.availableCopies -= 1;
                    await bookInven.save();

                    res.status(201).json(createdRes);
                }else{
                    res.status(400).json('Could not create new reservation');
                }
            }else{
                res.status(400).json('No available copies are present in the library');
            }
        }else{
            res.status(400).json('Could not find book inventory to make reservation');
        }
    }else{
        res.status(400).json('Error in getting request body');   
    }
   }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
   }
}


//Delete Reservation
const deleteReservation = async (req, res) =>{
    try{
        let resId = req.params.id;

        if (resId > 0){
            let destroyedRes = await Reservations.findOne({where: {id: resId}});

           if(destroyedRes !== null){
                //Acquire book inventory to update

                let bookInven = await BookInventory.findOne({where: {BookISBN: destroyedRes.BookISBN}});

                if (bookInven !== null){
                    let delResRecCount = await Reservations.destroy({where: {id: resId}, individualHooks: true});

                    if (delResRecCount > 0){
                        res.status(200).json('Number of reservations deleted:' + delResRecCount.toString());
                    }else{
                        res.status(400).json('Reservation does not exist');
                    }
                }else{
                    res.status(400).json('Could not find inventory to update');
                }
           }else{
                res.status(400).json('Could not find reservation');
           }
        }else{
            res.status(400).json('Invalid Reservation ID value');
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

module.exports = {
    getAllReservations,
    getReservationById,
    getReservationByBook,
    getReservationByMemId,
    createReservation,
    deleteReservation
}
