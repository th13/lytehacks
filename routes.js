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
      name: "Trevor Helms",
      github: "th13",
      tracks: ['track 0', 'track 2'],
      diet: ['meat only', 'not gluten free']
    }
  },
  {
    id: 2,
    attributes: {
      name: 'Nick Simspon',
      github: 'itsnicksimpson',
      tracks: ['track1', 'track2'],
      diet: ['vegan']
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
          name: Joi.string().min(1),
          github: Joi.string().min(1),
          // The registrant must supply at least one track
          tracks: Joi.array().items(Joi.string()).min(1),
          // TODO: Do we want this as an array or as a plain text string?
          diet: Joi.array().items(Joi.string())
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
