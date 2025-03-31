const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const { getAllCatways, getCatwayById, addCatway, updateCatway, patchCatway, deleteCatway } = require('../services/catways');

router.get('/catways', verifyToken, getAllCatways);
router.get('/catways/:id', verifyToken, getCatwayById);
router.post('/catways', verifyToken, addCatway);
router.put('/catways/:id', verifyToken, updateCatway);
router.patch('/catways/:id', verifyToken, patchCatway);
router.delete('/catways/:id', verifyToken, deleteCatway);

module.exports = router;