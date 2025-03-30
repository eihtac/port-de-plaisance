const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const { getAllCatways, getCatwayById, addCatway, updateCatway, patchCatway, deleteCatway } = require('../services/catways');

router.get('/', verifyToken, getAllCatways);
router.get('/:id', verifyToken, getCatwayById);
router.post('/', verifyToken, addCatway);
router.put('/:id', verifyToken, updateCatway);
router.patch('/:id', verifyToken, patchCatway);
router.delete('/:id', verifyToken, deleteCatway);

module.exports = router;