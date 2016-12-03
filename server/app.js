var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();
module.exports = app;

var publicPath = path.join(__dirname, '../public');
var indexHtmlPath = path.join(__dirname, '../index.html');

var RecordModel = require('./models/record_model');
var UserModel = require('./models/user_model');

var secret = require(path.join(__dirname, './env')).SESSION_SECRET;

// var compare = function(a,b) {
//   if (a.artist && b.artist) {
//     var a_artist = a.artist.replace('The ', '');
//     var b_artist = b.artist.replace('The ', '');
//     if (a_artist < b_artist) {
//       return -1;
//     } else if (a_artist > b_artist) {
//       return 1;
//     }
//     if (a.year < b.year) {
//       return -1;
//     } else if (a.year > b.year) {
//       return 1;
//     } else {
//       return 0;
//     }
//   } else {
//     return;
//   }
// }

app.set('superSecret', secret)

app.use(express.static(publicPath));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/setup', function(req, res) {

  // create a sample user
  var crullian = new UserModel({ 
    username: 'chrisgullian',
    admin: true 
  });

  crullian.setPassword('password');
  // save the sample user
  crullian.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

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
      res.send(records);
    }, Math.random() * 3000);
  });
});

app.post('/authenticate', function(req, res) {
  UserModel.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({success: false, message: 'Womp womp, user not found.'})
    } else if (user) {
      if (!user.validPassword(req.body.password)) {
        res.status(401).send({success: false, message: 'Wrong password, dawg.'})
      } else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: '2 days'
        })
        res.send({
          success: true,
          message: 'Successfully logged in!',
          token: token
        })
      }
    }
  })
})

// route middleware to verify a token
app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.status(403).send({success: false, message: err})
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there's no token, return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})

app.get('/users', function(req, res) {
  UserModel.find().then(function(users) {
    res.send(users)
  })
})

app.post('/records', function(req, res) {
  var recordData = req.body;
  RecordModel.create(recordData).then(function(record) {
    return RecordModel.find({});
  }).then(function(records) {
    return res.send(records);   
  }).catch(console.log.bind(console));
})

app.put('/records/:id', function(req, res) {
  var id = req.params.id;
  RecordModel.findById(id).exec().then(function(record) {
    return record.update(req.body); // .save isn't necessary here
  }).then(function() {
    return RecordModel.findById(id);
  }).then(function(record) {
    console.log(record);
    return res.send(record);
  }).catch(console.log.bind(console));
})

app.delete('/records/:id', function(req, res) {
  RecordModel.findById(req.params.id).exec().then(function(record) {
    return record.remove();
  }).then(function() {
    return RecordModel.find({});
  }).then(function(records) {
    return res.send(records);
  }).catch(console.log.bind(console));
})

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
