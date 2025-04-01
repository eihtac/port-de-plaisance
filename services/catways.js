const Catway = require('../models/catway');

exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        return catways;
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

        return catway;
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message});
    }
};

exports.addCatway = async (req, res) => {
    try {
        const { catwayNumber, type, catwayState } = req.body;

        if (!catwayNumber || !type || !catwayState) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const existingCatway = await Catway.findOne({ catwayNumber });
        if (existingCatway) {
            return res.status(400).json({ message: 'Ce numéro de catway est déjà utilisé' });
        }

        await Catway.create({ catwayNumber, type, catwayState });

        res.redirect('/catways?created=1');
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.updateCatway = async (req, res) => {
    try {
        const { catwayNumber, type, catwayState } = req.body;

        if (!catwayNumber || !type || !catwayState ) {
            return res.status(400).json({ message: 'Tous les champs sont requis'});
        }

        const id = req.params.id || req.body.id;

        const catway = await Catway.findByIdAndUpdate(
            id, 
            { catwayNumber, type, catwayState },
            { new: true, runValidators: true }
        );

        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
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
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        Object.keys(req.body).forEach((key) => {
            catway[key] = req.body[key];
        });

        await catway.save();

        res.redirect('/catways?updated=1');
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};

exports.deleteCatway = async (req, res) => {
    try {
        const catway = await Catway.findByIdAndDelete(req.params.id);

        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        res.redirect('/catways?deleted=1');
    } catch (error) {
        res.status(500).json({ message: 'Erreur', error: error.message });
    }
};