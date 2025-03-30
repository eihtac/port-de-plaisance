const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catwaySchema = new Schema({
    catwayNumber: {
        type: Number, 
        required: [true, 'Le numéro de catway est requis'],
        unique: true
    },
    type: {
        type: String, 
        required: [true, 'Le type est requis'],
        enum: ['short', 'long'],
        trim: true
    },
    catwayState: {
        type: String, 
        required: [true, "L'état du catway est requis"],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Catway', catwaySchema);