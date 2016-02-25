/**
* LyteHacks Backend API (c) 2016 LyteHacks
*
* db.js
* Initializes a connection to a MongoDB.
*/

'use strict';

const Mongoose = require('mongoose');

/**
* Exports a function that initializes the connection to the database.
*/
exports.connection = function(dbconf) {
  Mongoose.connect('mongodb://' + dbconf.host + ':27017/' + dbconf.database);

  const db = Mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error: '));
  db.once('open', function() {
    console.log('Connected to MongoDB dev');
  });
};
