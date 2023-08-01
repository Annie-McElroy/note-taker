const express = require('express');

// Import modular routers for notes
const notesRouter = require('./notes');

// Variable for app = express()
const app = express();

// app use for each router
app.use('/notes', notesRouter);

// export app
module.exports = app;