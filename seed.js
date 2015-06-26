var records = [{
    artist: 'Talk Talk',
    title: 'It\'s My Life',
    imgUrl: 'http://2.bp.blogspot.com/-FVdKO3rrASE/Uhn3fk48RGI/AAAAAAAAEAg/OcpcYZ4EpFU/s1600/R-151789-1316937808.jpeg'
}, {
    artist: 'Roxy Music',
    title: 'Avalon',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/en/9/92/Avalon_album_cover.jpg'
}];



var bluebird = require('bluebird');
var mongoose = require('mongoose');

var RecordModel = require('./server/models/record-model');

mongoose.connect('mongodb://localhost/VinylCache');

var wipeDB = function() {

    var models = [RecordModel];

    models.forEach(function(model) {
        model.find({}).remove(function() {});
    });

    return bluebird.resolve();

};

var seed = function() {

    RecordModel.create(records, function(err) {
        if (err) {
            console.error(err);
        }
        console.log('Database seeded!');
        process.kill(0);
    });

};

mongoose.connection.once('open', function() {
    wipeDB().then(seed);
});