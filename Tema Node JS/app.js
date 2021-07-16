const express = require('express');
const app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

app.get('/blocks', (request, response) => {
    response.json(blocks);
});

app.get('/blocks/:name', (request, response) => {
    var description = blocks[request.params.name];
    if (!description) {
        response.status(404).json('No description found for ' + request.params.name);
    } else {
        response.json(description);
    }

});


app.post('/blocks', parseUrlencoded, function(request, response) {
    var newBlock = request.body;
    response.status(201).json(newBlock.name);
    blocks[newBlock.name] = newBlock.description;
});



app.get('/parts', (request, response) => {
    response.send(' sunt pe parts');
});

app.listen(3000, () => {
    console.log('listening on 3000');
});