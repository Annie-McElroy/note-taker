// Import all necessary files
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils')

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET route for a specific note
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length < 0
                ? res.json(result)
                : res.json('No notes with that ID');
        })
})

// DELETE route for specific note - OPTIONAL
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId)

            writeToFile('./db/db.json', result);

            res.json(`Item ${noteId} has been deleted 🗑️`)
        })
})

// POST route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);

    // const for req.body
    const { title, text } = req.body;
    
    // if req.body
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        // readAndAppend
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});


// export notes
module.exports = notes;