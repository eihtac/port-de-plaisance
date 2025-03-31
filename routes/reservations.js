const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const { getAllReservations, getReservationsByCatway, getReservationById, addReservation, deleteReservation } = require('../services/reservations');

router.get('/reservations', verifyToken, getAllReservations);
router.get('/catways/:id/reservations', verifyToken, getReservationsByCatway);
router.get('/catways/:id/reservations/:idReservation', verifyToken, getReservationById);
router.post('/catways/:id/reservations', verifyToken, addReservation);
router.delete('/catways/:id/reservations/:idReservation', verifyToken, deleteReservation);

module.exports = router;