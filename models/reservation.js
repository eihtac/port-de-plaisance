const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    catwayNumber: {
        type: Number,
        required: [true, 'Le numéro du catway est requis']
    },

    clientName: {
        type: String,
        required: [true, 'Le nom du client est requis'],
        trim: true
    },

    boatName: {
        type: String,
        required: [true, 'Le nom du bateau est requis'],
        trim: true
    },

    checkIn: {
        type: Date, 
        required: [true, "La date d'arrivée est requise"]
    },
    
    checkOut: {
        type: Date,
        required: [true, "La date de départ est requise"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);