const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
const notedata = require('../db/db.json')
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);

    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, noteDB) => {
        if (err) {
            console.error(err)
        }
        else {
            res.send(noteDB);
        }
    });
});


// POST Route for a new note
notes.post('/notes', (req, res) => {
//   console.info(`${req.method} request received to add a note`);
//   console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),  
    };
    
    notedata.push(newNote);
    
    const fullNotes = JSON.stringify(notedata, null, 2);

    // pass absolute path 
    // Write the string to a file
    fs.writeFile(path.join(__dirname, `../db/db.json`), fullNotes, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Note regarding ${newNote.title} has been written to JSON file`
          )
    )
    // readAndAppend(newNote, '../db/db.json');
    res.json(`Note added successfully`);
  } 
  else {
    res.json('Error in adding note');
  }
});


// GET Route for a specific note
notes.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    
    console.info(`${req} request received for notes`)    
    const result = notedata.filter((note) => note.id === noteId);
    res.json(result);
  });

// DELETE Route for a specific note
notes.delete('/notes/:id', (req, res) => {
    
    const noteId = req.params.id;

    if (noteId) {
        const notesLessNoteId = notedata.filter((note) => note.id !== noteId);
        const fullNotes = JSON.stringify(notesLessNoteId, null, 2);
    
        fs.writeFile(path.join(__dirname, '../db/db.json'), fullNotes, (err) => 
            err
            ? console.error(err)
            : console.log(
                `Item ${noteId} has been deleted`
                )
            )
        // res.json(`Note deleted successfully`);
        res.json(notesLessNoteId);
        //send updated object looping over and displaying
    }
    else {
        res.json('Error in deleting note');
    }
});


module.exports = notes;
