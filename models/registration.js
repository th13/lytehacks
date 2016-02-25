/**
* LyteHacks Backend API (c) 2016 LyteHacks
*
* models/registration.js
* Model for a registration for a LyteHacks event.
*/

'use strict';

const Mongoose = require('mongoose');

const registrationSchema = new Mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  tracks: [String],
  diet: String,
  comments: String
});

module.exports = Mongoose.model('Registration', registrationSchema);
