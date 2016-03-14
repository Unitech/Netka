
var nssocket = require('nssocket');

var Server = {
  init : function initServer(port, cb) {

	  this.server = nssocket.createServer(cb);

	  this.server.on('error', function(err) {
      console.error(err);
	  });

	  this.server.on('listening', function() {
      console.log('Listening on port', port);
	  });

	  this.server.listen(port, '0.0.0.0');

    return this.server;
  }
};

module.exports = Server;
