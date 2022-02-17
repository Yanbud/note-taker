const express = require('express');
const uuid = require('../helpers/uuid');
const notes = express.Router();
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

notes.post('/notes', (req, res) => {

    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            } else {
                var parsedData = JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
                    err ?
                    console.error(err) :
                    res.json(`${JSON.parse(data)}`));

            }
        })
    }

})
notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json', 'utf8')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId)
            const jsonRe = JSON.stringify(result);
            fs.writeFile('./db/db.json', jsonRe, (err) =>
                err ? console.error(err) : res.json(`Item ${noteId} has been deleted 🗑️`));;
        })
});
module.exports = notes;