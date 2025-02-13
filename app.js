const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('express-flash');
const path = require('path');
const pool = require('./config/database');

// Import passport config
require('./config/passport');

// Import routes
const indexRouter = require('./routes/index');
const submissionRouter = require('./routes/submission');
const dashboardRouter = require('./routes/dashboard');
const authRouter = require('./routes/auth');

const app = express();

// Middleware setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'rahasia-session-key',
    resave: false,
    saveUninitialized: false
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware untuk meneruskan user ke views
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.messages = req.flash();
    next();
});

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/', submissionRouter);
app.use('/', dashboardRouter);

// Test koneksi database
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error koneksi ke database:', err);
    } else {
        console.log('Berhasil terkoneksi ke database');
        connection.release();
    }
});

// Menjalankan server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
