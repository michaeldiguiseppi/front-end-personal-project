var server = require('node-http-server');
server.deploy(
  {
    port:process.env.PORT || 8080,
    root:__dirname + '/src',
  }
);
