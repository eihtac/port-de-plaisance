const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        const newUser = await User.create({ name, email, password });

        res.status(201).json({
            message: 'Utilisateur créé !',
            user: {
                id: newUser._id, 
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Erreur', error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "L'utilisateur n'existe pas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.status(200).json({
        message: 'Connexion réussie !',
        token: token
    });
};