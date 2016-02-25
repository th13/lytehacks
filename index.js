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

// Local dependencies
const routes = require('./routes');
const db = require('./db');

const server = new Hapi.Server();

// Initialize Hapi server
server.connection({
  port: process.env.PORT || 3000
});

// Initialize MongoDB connection
db.connection({
  host: 'localhost',
  database: 'dev'
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
