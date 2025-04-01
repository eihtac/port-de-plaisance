const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true, 
        required: [true, 'Le nom est requis']
    },

    email: {
        type: String,
        trim: true, 
        required: [true, "L'email est requis"],
        unique: true, 
        lowercase: true
    },
    
    password: {
        type: String,
        trim: true,
        required: [true, 'Le mot de passe est requis']
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);

    next();
});

module.exports = mongoose.model('User', userSchema);