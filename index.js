'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();


//------------------------------------------------------------------------------
//                           Server configuration
//------------------------------------------------------------------------------

server.connection({
  port: process.env.PORT || 3000
});

server.register(require('vision'), (err) => {
  server.views({
    engines: {
      jade: require('jade')
    },
    relativeTo: __dirname,
    path: './views',
    layoutPath: './views/layouts',
    helpersPath: './views/helpers'
  });
});


server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply("I'm Hapi");
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Server running at: ', server.info.uri);
});
