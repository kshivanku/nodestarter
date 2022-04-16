const { response } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
app.listen(8080, ()=> console.log('listening at 8080'))
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

app.post('/api', (req, res) => {
    console.log(req.body)
    const data = {lat: req.body.lat, lon: req.body.lon}
    fs.writeFile('latlon.json', JSON.stringify(data, null, 2), (err) => {err ? console.log(err) : console.log('successfully written file')})
    res.json({
        status: 'success',
        lat: req.body.lat, 
        lon: req.body.lon
    })
})