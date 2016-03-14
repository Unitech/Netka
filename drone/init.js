
var API = require('./api.js');
var nssocket = require('nssocket');

function generateRoutes() {

}
var Server = {
    init : function initServer(cb) {
	
	this.server = nssocket.createServer(connectionListener);

	this.server.on('error', function() {
	});

	this.server.on('listening', function() {
	});

	this.server.listen(9876, '0.0.0.0');	
    },
    loadRoutes : function loadRoutes() {
	var self = this;

	Object.keys(API).forEach(function(route_name) {
	    console.log('Binding route name %s', route_name);
	    self.socket.data([route_name], API[route_name]);
	});
    }
}


    //
    // Create an `nssocket` TCP server
    //

