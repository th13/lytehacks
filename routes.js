/**
* LyteHacks Backend API (c) 2016 LyteHacks
*
* routes.js
* Specifies all API route endpoints.
*/

'use strict';

const Joi = require('joi');

// Example
let registrations = [
  {
    id: 1,
    attributes: {
      firstName: 'Trevor',
      lastName: 'Helms',
      email: 'th13@my.fsu.edu',
      tracks: ['track 0', 'track 2'],
      diet: 'Meat only.',
      comments: 'I created this.'
    }
  },
  {
    id: 2,
    attributes: {
      firstName: 'Nick',
      lastName: 'Simpson',
      email: 'itsnicksimpson@gae.com',
      tracks: ['track1', 'track2'],
      diet: 'Vegan',
      comments: 'I\'m gae'
    }
  }
];

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
      reply({
        collection: 'registrations',
        data: registrations
      });
    }
  });

  // POST /registrations
  // Creates a new registration.
  server.route({
    method: 'POST',
    path: '/registrations',
    handler: function(request, reply) {
      // Assign id to be the next integer not used
      let id = registrations[registrations.length - 1].id + 1;

      // Create a registration object based on the payload
      let registration = {
        id: id,
        attributes: request.payload
      };

      // Add a registration
      // TODO: Convert this to a model, implement persistant storage
      registrations.push(registration);

      // Reply with the newly created object and the collection it belongs to
      reply({
        collection: 'registrations',
        data: registration
      }).created('/registrations');
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
