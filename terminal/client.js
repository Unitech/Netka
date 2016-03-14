'use strict';

var nssocket = require('nssocket');

class Client {
  constructor(ip, port) {
    var self = this;

	  this.socket = new nssocket.NsSocket({
	    type : 'tcp4'
	  });

	  this.socket.on('error', function(e) {
	    console.error(e);
	  });

	  this.socket.on('close', function() {
	    console.log('Connection closed', arguments);
      setTimeout(function() {
        console.log('Reconnecting');
        self.socket.connect(port, ip);
      });
	  });

	  this.socket.on('reconnecting', function() {
      console.log('Reconnecting');
	  });

	  this.socket.on('start', () => {
      console.log('Connection established');
    });

    this.socket.connect(port, ip);

    return this.socket;
  }
};

module.exports = Client;
