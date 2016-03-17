'use strict';

var nssocket = require('nssocket');

class Client {
  constructor(ip, port) {
    var self = this;

    this.ip = ip;
    this.port = port;

	  this.socket = new nssocket.NsSocket({
	    type : 'tcp4'
	  });

	  this.socket.on('error', function(e) {
	    console.error(e);
	  });

	  this.socket.on('close', function() {
	    console.log('Connection closed', arguments);
      setTimeout(function() {
        self.socket.connect(port, ip);
      }, 1000);
	  });

	  this.socket.on('reconnecting', function() {
      console.log('Reconnecting');
	  });

	  this.socket.on('start', () => {
      console.log('Connection established to %s:%s', this.ip, this.port);
    });

    this.socket.connect(this.port, this.ip);

    return this.socket;
  }
};

module.exports = Client;
