const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const indexRouter = require('./routes/index');
const submissionRouter = require('./routes/submission');
const dashboardRouter = require('./routes/dashboard');

const app = express();

// Middleware setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use('/', submissionRouter);
app.use('/', dashboardRouter);

// Menjalankan server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
