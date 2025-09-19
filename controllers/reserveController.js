const db = require('../models/modelIndex.js');
const Reservations = db.reservations;

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

//Get reservations by BookId (TEST)
const getReservationByBook = async (req, res) =>{
    try{
        let bookId = req.params.BookId;

        if (bookId > 0)
        {
            let reserveRec = await Reservations.findAll({where: {BookId: bookId}});

            if (reserveRec.length !== 0){
                res.status(200).json(reserveRec);
            }else{
                res.status(400).json('Reservation does not exist');
            }
        }else{
            res.status(400).json('Incorrect ID Value');
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Get reservations by MemberId (TEST)
const getReservationByMemId = async (req, res) =>{
    try{
        let memId = req.params.MemberId;

        if(reserveID > 0)
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
        BookId: req.body.BookId
    };

    if (newReservation !== null || newReservation !== undefined){

        let reserveCheck = await Reservations.findOne({where: {MemberId: newReservation.MemberId, BookId: newReservation.BookId}});

        if (reserveCheck === null){
            let createdRes = await Reservations.create(newReservation);

            if (createdRes !== null || createdRes !== undefined){
                res.status(201).json(createdRes);
            }else{
                res.status(400).json('Could not create new reservation');
            }
        }else{
            res.status(400).json('A reservation for this book under this member has already been made');
        }

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
            let delResRecCount = await Reservations.destroy({where: {id: resId}});

            if (delResRecCount > 0){
                res.status(200).json(delResRecCount > 0);
            }else{
                res.status(400).json('Reservation does not exist');
            }
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
