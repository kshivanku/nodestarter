const { response } = require('express');
const Datastore = require('nedb');
const express = require('express');
const app = express();
app.listen(8080, ()=> console.log('listening at 8080'))
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (req, res) => {
    console.log(req.body)
    const data = req.body;
    data.timestamp = Date.now();
    database.insert(data)
    res.json(data)
})

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if(err){
            response.end()
        }
        res.json(data)
    })
})