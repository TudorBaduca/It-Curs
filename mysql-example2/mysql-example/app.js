const express = require('express');
const cors =  require("cors");
const app = express();

app.use(express.static('public'));
app.use(cors());

const bodyParser = require('body-parser');
const parseUrlencoded = bodyParser.urlencoded({ extended: true });
app.use(parseUrlencoded);
app.use(express.json());

const movies = require('./routes/movies.js')

app.use('/movies', movies);

app.listen(4000, () => {
    console.log('listening on 4000');
});