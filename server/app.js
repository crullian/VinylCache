var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
module.exports = app;

var publicPath = path.join(__dirname, '../public');
var indexHtmlPath = path.join(__dirname, '../index.html');

var RecordModel = require('./models/record_model');
var UserModel = require('./models/user_model');

var compare = function(a,b) {
  if (a.artist && b.artist) {
    var a_artist = a.artist.replace('The ', '');
    var b_artist = b.artist.replace('The ', '');
    if (a_artist < b_artist) {
      return -1;
    } else if (a_artist > b_artist) {
      return 1;
    }
    if (a.year < b.year) {
      return -1;
    } else if (a.year > b.year) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return;
  }
}

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
  req.query.artist ? modelParams.artist = req.query.artist : null;
  req.query.title ? modelParams.title = req.query.title : null;
  req.query.year ? modelParams.year = req.query.year : null;
  RecordModel.find(modelParams).then(function(records) {
    setTimeout(function() {
      res.send(records.sort(compare));
    }, Math.random() * 3000);
  });
});

// app.post('/records', function(req, res) {
//   // Reference schema for what is expected as the POST body.
//   var recordData = req.body;
//   RecordModel.create(recordData, function(err, record) {
//     // res.status(200).end();
//     if (!err) {
//       RecordModel.find({}, function(err, records) {
//         res.send(records);
//       })
//     } else {
//       console.log(err);
//     }
//   });
// });

app.post('/records', function(req, res) {
  var recordData = req.body;
  RecordModel.create(recordData).then(function(record) {
    return RecordModel.find({});
  }).then(function(records) {
    return res.send(records.sort(compare));   
  }).catch(console.log.bind(console));
})

// app.put('/records/:id', function(req, res) {
//   RecordModel.findById(req.params.id, function(err, record) {
//     record.update(req.body, function() {
//       record.save(function(err) {
//         if (err) {
//           console.log(err);
//         } else {
//           // res.status(200).end();
//           RecordModel.find({}, function(err, records) {
//             res.send(records);
//           })
//         }
//       })
//     })
//   })
// })

app.put('/records/:id', function(req, res) {
  RecordModel.findById(req.params.id).exec().then(function(record) {
    return record.update(req.body); // .save isn't necessary here
  }).then(function() {
    return RecordModel.find({});
  }).then(function(records) {
    return res.send(records.sort(compare));
  }).catch(console.log.bind(console));
})

// app.delete('/records/:id', function(req, res) {
//   RecordModel.findById(req.params.id, function(err, record) {
//     record.remove(function(err) {
//       if (!err) {
//         RecordModel.find({}, function(err, records) {
//           res.send(records);
//         });
//         // res.status(204).end();
//       } else {
//         console.log(err);
//       }
//     })
//   })
// })

app.delete('/records/:id', function(req, res) {
  RecordModel.findById(req.params.id).exec().then(function(record) {
    return record.remove();
  }).then(function() {
    return RecordModel.find({});
  }).then(function(records) {
    return res.send(records.sort(compare));
  }).catch(console.log.bind(console));
})
