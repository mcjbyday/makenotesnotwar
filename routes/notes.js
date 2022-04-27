const notes = require('express').Router();
// const { readFromFile } = require('../helpers/fsUtils');
const fs = require('fs');
const path = require('path');
const notedata = require('../db/db.json')
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  res.json(notedata);
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_uuid: uuid(),  
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

module.exports = notes;
