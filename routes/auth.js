const express = require('express');
const router = express.Router();
const { addUser, loginUser } = require('../services/users');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', (req, res) => {
    const success = req.query.success === '1';
    const logout = req.query.logout === '1';

    res.render('home', { 
        title: 'Accueil',
        showHeader: false,
        success, 
        logout
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        title : 'Inscription', 
        showHeader: false 
    });
});

router.get('/dashboard', verifyToken, (req, res) => {
    res.render('dashboard', {
        title: 'Tableau de bord', 
        showHeader: true
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erreur');
        }
        res.redirect('/?logout=1');
    });
});


router.post('/register', addUser);
router.post('/login', loginUser);

module.exports = router;