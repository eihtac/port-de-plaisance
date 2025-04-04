require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');
const PORT = process.env.PORT || 8080;
const helmet = require('helmet');

app.use(helmet());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 24 * 60 * 60
    }),
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

const authRoutes = require('./routes/auth');
const catwayRoutes = require('./routes/catways');
const reservationRoutes = require('./routes/reservations');
const userRoutes = require('./routes/users');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

app.use('/', authRoutes);
app.use('/', catwayRoutes);
app.use('/', reservationRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => {
    console.log(`L'application écoute sur le port ${PORT}!`)
});
