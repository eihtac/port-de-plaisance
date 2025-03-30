const Catway = require('../models/catway');

exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.getCatwayById = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);

        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message});
    }
};

exports.addCatway = async (req, res) => {
    try {
        const { catwayNumber, type, catwayState } = req.body;

        if (!catwayNumber || !type || !catwayState) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }

        const existingCatway = await Catway.findOne({ catwayNumber });
        if (existingCatway) {
            return res.status(400).json({ message: 'Ce numéro de catway est déjà utilisé' });
        }

        const newCatway = await Catway.create({ catwayNumber, type, catwayState });

        res.status(201).json({
            message: 'Catway créé !',
            catway: newCatway
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.updateCatway = async (req, res) => {
    try {
        const catway = await Catway.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!catway) {
            return res.status(404).json({ message: 'Catway introuvable' });
        }

        res.status(200).json({
            message: 'Catway mis à jour !',
            catway : catway
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.patchCatway = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) {
            return res.status(404).json({ message: 'Catway introuvable' });
        }

        Object.keys(req.body).forEach((key) => {
            catway[key] = req.body[key];
        });

        await catway.save();

        res.status(200).json({
            message: 'Catway modifié !',
            catway: catway
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.deleteCatway = async (req, res) => {
    try {
        const catway = await Catway.findByIdAndDelete(req.params.id);

        if (!catway) {
            return res.status(404).json({ message: 'Catway introuvable' });
        }

        res.status(200).json({
            message: 'Catway supprimé !',
            catway: catway
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};