const express = require('express');
const path = require('path');

const app = express();

PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const api = require('./routes/notes.js')
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})



app.listen(PORT, () => { console.log('App listening at http://localhost:3001') })