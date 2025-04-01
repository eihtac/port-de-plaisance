const express = require('express');
const router = express.Router();
const { updateUser, patchUser, deleteUser, getAllUsers, getUserById } = require('../services/users');
const verifyToken = require('../middlewares/verifyToken');

router.get('/users', verifyToken, async (req, res) => {
    const users = await getAllUsers(req, res);
    const created = req.query.created === '1';
    const updated = req.query.updated === '1';
    const deleted = req.query.deleted === '1';

    res.render('users', {
        title: 'Utilisateurs',
        showHeader: true, 
        users,
        created,
        updated,
        deleted
    });
});

router.get('/users/:id', verifyToken, async (req, res) => {
    const user = await getUserById(req, res);
    
    if (user) {
        res.render('user', {
            title: `Utilisateur ${user.name}`,
            showHeader: true,
            user
        });
    }
});

router.put('/users/:id', verifyToken, updateUser);
router.patch('/users/:id', verifyToken, patchUser);
router.delete('/users/:id', verifyToken, deleteUser);

module.exports = router;