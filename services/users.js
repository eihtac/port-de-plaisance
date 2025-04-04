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

        await User.create({ name, email, password });

        if (req.body.fromDashboard) {
            res.redirect('/users?created=1');
        } else {
            res.redirect('/?success=1');
        }

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

    req.session.token = token;

    if (req.headers['x-test']) {
        return res.json({ token });
    }

    res.redirect('/dashboard')
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return user;
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Tous les champs sont requis'});
        } 

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        user.name = name;
        user.email = email;
        user.password = password;

        await user.save();
        
        res.redirect('/users?updated=1');
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.patchUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        Object.keys(req.body).forEach((key) => {
            user[key] = req.body[key];
        });

        await user.save();

        res.status(200).json({
            message: 'Utilisateur modifié !',
            user: user
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.redirect('/users?deleted=1');
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};