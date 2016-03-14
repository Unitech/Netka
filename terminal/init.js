'use strict';

var Client = require('./client.js');
var Joystick = require('./lib/Joystick.js');

class Terminal {
  constructor(ip, port) {
    this.client     = new Client(ip, port);
    this.controller = new Joystick();

    this.client.data(['welcome'], function(data) {
      console.log('Welcome msg:', JSON.stringify(data, '', 2));
    });

    this.controller.on('position', position => {
      this.client.send('cmd:rc:pwm', position);
      console.log(position);
    });
  }
}

new Terminal('127.0.0.1', 9876);
