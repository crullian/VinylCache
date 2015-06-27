var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
module.exports = app;

var publicPath = path.join(__dirname, '../public');
var indexHtmlPath = path.join(__dirname, '../index.html');

var RecordModel = require('./models/record-model');

app.use(express.static(publicPath));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(indexHtmlPath);
});

app.get('/records', function(req, res) {
  var modelParams = {};
  if (req.query.artist) {
    modelParams.artist = req.query.artist;
  }
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

app.put('/records', function(req, res) {
  var recordData = req.body;
  RecordModel.findByIdAndUpdate(recordData.id, {
    artist: recordData.artist,
    title: recordData.title,
    imgUrl: recordData.imgUrl
  }).then(function() {
    res.status(200).end();
  })
})

app.delete('/records', function(req, res) {
  console.log('REQ.BODY: ', req.body);
  console.log('REQ.QUERY: ', req.query);
  console.log('REQ.PARAMS: ', req.params);
  RecordModel.findOneAndRemove({
    _id: req.body.id
  }, function(err) {
    console.log('Yay, error');
  })
})