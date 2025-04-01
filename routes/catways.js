const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const { getAllCatways, getCatwayById, addCatway, updateCatway, patchCatway, deleteCatway } = require('../services/catways');

router.get('/catways', verifyToken, async (req, res) => {
    const catways = await getAllCatways(req, res);
    const created = req.query.created === '1';
    const updated = req.query.updated === '1';
    const deleted = req.query.deleted === '1';

    if (catways) {
        res.render('catways', {
            title: 'Catways',
            showHeader: true,
            catways,
            created, 
            updated, 
            deleted
        });
    }
});

router.get('/catways/:id', verifyToken, async (req, res) => {
    const catway = await getCatwayById(req, res);

    if (catway) {
        res.render('catway', {
            title: `Catway n°${catway.catwayNumber}`,
            showHeader: true, 
            catway
        });
    }
});

router.post('/catways', verifyToken, addCatway);
router.put('/catways/:id', verifyToken, updateCatway);
router.patch('/catways/:id', verifyToken, patchCatway);
router.delete('/catways/:id', verifyToken, deleteCatway);

module.exports = router;