const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
// const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (title & text) {
    const newNote = {
      title,
      text,
    };

    // const noteString = JSON.stringify(newNote);

    // // Write the string to a file
    // fs.writeFile(`../db/db.json`, noteString, (err) =>
    //   err
    //     ? console.error(err)
    //     : console.log(
    //         `Note regarding ${newNote.title} has been written to JSON file`
    //       )
    // )
    readAndAppend(newNote, '../db/db.json');
    res.json(`Note added successfully`);
  } 
  else {
    res.json('Error in adding note');
  }
});

module.exports = notes;
