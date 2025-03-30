require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const authRoutes = require('./routes/auth');
const catwayRoutes = require('./routes/catways');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

app.use('/', authRoutes);
app.use('/catways', catwayRoutes);

app.listen(PORT, () => {
    console.log(`L'application écoute sur le port ${PORT}!`)
});
