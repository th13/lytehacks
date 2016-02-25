/**
* LyteHacks Backend API (c) 2016 LyteHacks
*
* index.js
* Creates a Hapi server, configures it, and defines route endpoints.
*/

'use strict';

// Global dependencies
const Hapi = require('hapi');
const Good = require('good');
const Vision = require('vision');
const Inert = require('inert');
const GoodConsole = require('good-console');
const HapiMongodb = require('hapi-mongodb');

// Local dependencies
const routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 3000
});

// All plugins that must be ensured to be loaded before the application runs
// should be declared in this array
const plugins = [
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
  },
  {
    register: HapiMongodb,
    options: {
      url: 'mongodb://localhost:27017/dev',
      decorate: 'db'
    }
  },
  routes
];


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
