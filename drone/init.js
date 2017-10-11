'use strict';

var API      = require('./api.js');
var nssocket = require('nssocket');
var PWM      = require('./lib/pwm');
var Server   = require('./server.js');

class Drone {
  constructor(name) {
    this.pwm    = new PWM();
    this.initPWM();
    this.name   = name;

    this.server = Server.init(9876, connection => {
      console.log('V New connection established');
      this.welcomeMessage(connection);
      this.loadActions(connection);
    });
  }

  welcomeMessage(connection) {
    connection.send(['welcome'], {
      name: this.name
    });
  }

  initPWM() {
  }

  loadActions(connection) {
    Object.keys(API).forEach(route_name => {
	    console.log('O Exposing route name %s', route_name);
	    connection.data([route_name], API[route_name].bind(this));
	  });
  }
}


var mw6 = new Drone('mw6');
