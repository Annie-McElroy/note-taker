// Import necessary js files
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');

// create port and app
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Custom middleware
app.use(clog);

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard path back to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

// listen() method
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);