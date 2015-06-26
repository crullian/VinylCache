var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
// var sass = require('node-sass-middleware');

var app = express();
module.exports = app;

var publicPath = path.join(__dirname, '../public');
var indexHtmlPath = path.join(__dirname, '../index.html');

var RecordModel = require('./models/record-model');

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(
//     sass({
//         src: __dirname + '/assets', //where the sass files are 
//         dest: __dirname + '/public/css/', //where css should go
//         debug: true
//     })
// );

app.get('/', function(req, res) {
    res.sendFile(indexHtmlPath);
});

app.get('/records', function(req, res) {

    var modelParams = {};

    // if (req.query.artist) {
    //     modelParams.artist = req.query.artist;
    // }

    RecordModel.find(modelParams, function(err, records) {
        setTimeout(function() {
            res.send(records);
        }, Math.random() * 1000);
    });

});

app.post('/records', function(req, res) {

    // Reference schema for what is expected as the POST body.
    var recordData = req.body;

    RecordModel.create(recordData).then(function() {
        res.status(200).end();
    });

});