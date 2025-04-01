const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const { getAllReservations, getReservationsByCatway, getReservationById, addReservation, deleteReservation } = require('../services/reservations');

router.get('/reservations', verifyToken, async (req, res) => {
    const reservations = await getAllReservations(req, res);
    const created = req.query.created === '1';
    const deleted = req.query.deleted === '1';

    if (reservations) {
        res.render('reservations', {
            title: 'Réservations',
            showHeader: true,
            reservations,
            created, 
            deleted
        });
    }
});

router.get('/catways/:id/reservations/:idReservation', verifyToken, async (req, res) => {
    const reservation = await getReservationById(req, res);
    
    if (reservation) {
        res.render('reservation', {
            title: `Réservation de ${reservation.clientName}`,
            showHeader: true, 
            reservation
        });
    }
});

router.get('/catways/:id/reservations', verifyToken, getReservationsByCatway);
router.post('/catways/:id/reservations', verifyToken, addReservation);
router.delete('/catways/:id/reservations/:idReservation', verifyToken, deleteReservation);

module.exports = router;