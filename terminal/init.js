#!/usr/bin/env node

'use strict';

var Client = require('./client.js');
var Joystick = require('./lib/Joystick.js');

class Terminal {
  constructor(ip, port) {
    this.client     = new Client(ip, port);
    this.controller = new Joystick();

    this.startControl();
  }

  startControl() {
    this.client.data(['welcome'], function(data) {
      console.log('Welcome msg:', JSON.stringify(data, '', 2));
    });

    this.controller.on('position', position => {
      this.client.send('cmd:rc:pwm', position);
      console.log(position);
    });
  }
}

var program = require('commander');

program
  .command('start <ip> [port || 9876]')
  .action(function (ip, port) {
    if (!port)
      port = 9876;

    new Terminal(ip, 9876);
  });

program
  .command('detect [type (full or default ping)]')
  .action(function (type) {

    var exec = require('shelljs').exec;

    if (!type) {
      exec('nmap -sP 192.168.0.0/24', function(err, data) {
        //console.log(err, data);
        console.log('end');
      });
    }
    else {
      exec('nmap -F 192.168.0.0/24', function(err, data) {
        //console.log(err, data);
        console.log('end');
      });
    }
  });


program.parse(process.argv);

if (process.argv.length == 2) {
  program.parse(process.argv);
  program.outputHelp();
}
