'use strict';

// Global dependencies
const Hapi = require('hapi');
const Good = require('good');
const Joi = require('joi');
const Vision = require('vision');
const Inert = require('inert');
const GoodConsole = require('good-console');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 3000
});

// All plugins that must be ensured to be loaded before the application runs
// should be declared in this array
var plugins = [
  Vision,
  Inert,
  {
    register: Good,
    options: {
      reporters: [{
        reporter: GoodConsole,
        events: {
          response: '*',
          log: '*'
        }
      }]
    }
  }
];

// Routes

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply(`I'm so Hapi.`);
  }
});

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

/**
* GET /registrations
*
* Return a complete list of registrations
*/
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

// Register all of our plugins, then set up views, static file serving, and start
// the server
server.register(plugins, (err) => {
  if (err) {
    throw err;
  }

  // Views setup
  server.views({
    engines: {
      jade: require('jade')
    },
    relativeTo: __dirname,
    path: './views',
    layoutPath: './views/layouts',
    helpersPath: './views/helpers'
  });

  // Serve static content
  server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
  });

  // Start the server
  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Server running at: ', server.info.uri);
  });

});
