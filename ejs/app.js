const express = require('express');
const path = require('path');
const app = express();
const indexRoutes = require('./routes/index');
const aboutRoutes = require('./routes/about');

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Set the views folder
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRoutes);
app.use('/about', aboutRoutes);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).render('error', { title: '404 - Page Not Found' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
