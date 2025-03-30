const express = require('express');
const router = express.Router();
const { addUser, loginUser } = require('../services/users');

router.post('/register', addUser);
router.post('/login', loginUser);

module.exports = router;