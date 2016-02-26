/**
* LyteHacks Backend API (c) 2016 LyteHacks
*
* routes.js
* Specifies all API route endpoints.
*/

'use strict';

const Joi = require('joi');

const Registration = require('./models/registration');

// Note: register is a Hapi keyword, and has nothing to do with registrations.
exports.register = function(server, options, next) {
  // GET /
  // Doesn't do much useful.
  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply(`I'm so Hapi.`);
    }
  });

  // GET /registrations
  // Return a complete list of registrations.
  server.route({
    method: 'GET',
    path: '/registrations',
    handler: function(request, reply) {
      Registration.find({}).then(function(data) {
        reply({
          collection: 'registrations',
          data: data
        });
      });
    }
  });

  // POST /registrations
  // Creates a new registration.
  server.route({
    method: 'POST',
    path: '/registrations',
    handler: function(request, reply) {
      console.log(request.payload);
      let registration = new Registration(request.payload);

      registration.save().then(function(data) {
        // Reply with the newly created object and the collection it belongs to
        reply({
          collection: 'registrations',
          data: data
        }).created('/registrations');
      });
    },
    config: {
      validate: {
        payload: {
          firstName: Joi.string().min(1).required(),
          lastName: Joi.string().min(1).required(),
          email: Joi.string().email().required(),
          // The registrant must supply at least one track
          tracks: Joi.array().items(Joi.string()).min(1).required(),
          diet: Joi.string().allow(''),
          comments: Joi.string().allow('')
        }
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'routes',
  version: '1.0.0'
};
