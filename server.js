const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const { json } = require('express');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
});
    
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('highscore.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.count({},(err,data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});


app.post('/api', (request, response) => {
console.log(request.body);
const data = request.body;
const timestamp = Date.now();
data.timestamp = timestamp;
database.insert(data);
response.json({
      status: 'success',
      timestamp: timestamp,
      highScore: data.highScore
    });
});