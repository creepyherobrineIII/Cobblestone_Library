const db = require('../models/modelIndex.js');
const Reserve = db.reserve;

//Get all reservations
const getAllReservations = async (req, res) =>{
    try{
        let reservations = await Reserve.findAll();

        res.status(200).json(reservations);
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
            let reserveRec = await Reserve.findOne({where: {id: reserveId}});

            res.status(200).json(reserveRec);
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
        let bookId = req.params.id;

        if (bookId > 0)
        {
            let reserveRec = await Reserve.findOne({where: {BookId: bookId}});

            res.status(200).json(reserveRec);
        }else{
            res.status(400).json('Incorrect ID Value');
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

//Get reservations by MemberId (TEST)

//Post reservation 
const createReservation = async (req, res) =>{
   try{
     let newReservation = {
        resDateExpiry: req.body.resDateExpiry,
        MemberId: req.body.MemberId,
        BookId: req.body.BookId
    };

    if (newReservation !== null || newReservation !== undefined){
        let createdRes = await Reserve.create(newReservation);

        if (createdRes !== null || createdRes !== undefined){
            res.status(201).json(createdRes);
        }else{
            res.status(400).json('Could not create new reservation');
        }
    }
   }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
   }
}

//Update reservation

//Delete Reservation

module.exports = {
    getAllReservations,
    getReservationById,
    getReservationByBook,
    createReservation
}
