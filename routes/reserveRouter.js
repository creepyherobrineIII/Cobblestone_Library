const reservationController = require('../controllers/reserveController.js');

const router = require('express').Router();

//GET Methods
//Get all reservations
router.get('/', reservationController.getAllReservations);

//Get reservation by id
router.get('/:id', reservationController.getReservationById);

//Get reservation by book id
router.get('/book-id/:BookId', reservationController.getReservationByBook);

//Get reservation by member id
router.get('/member-id/:MemberId', reservationController.getAllReservations);

//POST Methods
//Add new reservation
router.post('/add-reservation', reservationController.createReservation);


//DELETE Methods
//Delete reservation
router.delete('/delete/:id', reservationController.deleteReservation);

module.exports = router;