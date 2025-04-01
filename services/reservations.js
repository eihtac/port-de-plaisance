const Catway = require('../models/catway');
const Reservation = require('../models/reservation');

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        return reservations;
    } catch (error) {
        res.status(500).json({message: 'Erreur', error: error.message });
    }
};

exports.getReservationsByCatway = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);

        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        const reservations = await Reservation.find({
            catwayNumber: catway.catwayNumber
        });

        return reservations;
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.idReservation);

        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        return reservation;
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.addReservation = async (req, res) => {
    try {
        const { catwayNumber, clientName, boatName, checkIn, checkOut } = req.body;

        if (!catwayNumber || !clientName || !boatName || !checkIn || !checkOut ) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const catway = await Catway.findOne({ catwayNumber });
        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        await Reservation.create({
            catwayNumber: catway.catwayNumber,
            clientName,
            boatName, 
            checkIn,
            checkOut
        });

        res.redirect('/reservations?created=1');
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);

        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        res.redirect('/reservations?deleted=1');
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};