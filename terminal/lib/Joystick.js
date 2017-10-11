'use strict';

var EventEmitter = require('events').EventEmitter;
var Controller   = require('joystick');

var Joystick = (function() {
  function Command(refresh_rate) {
    var self = this;

    EventEmitter.call(Command);

    this.controller = new Controller(0, 200, 200);

    this.curr_pos = {
      // throttle
      t : 0,
      // yaw
      y : 0,
      // pitch
      p : 0,
      // roll
      r : 0
    };


    function _emit(data) {
      self.emit('position', data);
    }
    this.controller.on('axis', data => {
      var pckt = {};

      data.value += 32767;

      console.log(data);
      switch(data.number) {
      case 0:
        pckt.val = data.value;
        pckt.act = 'roll';
        _emit(pckt);
        break;
      case 1:
        pckt.val = data.value;
        pckt.act = 'pitch';
        _emit(pckt);
        break;
      case 2:
        pckt.val = data.value;
        pckt.act = 'throttle';
        _emit(pckt);
        break;
      case 3:
        pckt.val = data.value;
        pckt.act = 'yaw';
        _emit(pckt);
      case 4:
        pckt.val = data.value;
        pckt.act = 'action';
        _emit(pckt);
      }
    });

    return false;

    //this.controller.on('button', console.log);
    /**
     * Continious
     */
    this.controller.on('axis', data => {
      switch(data.number) {
      case 0:
        this.curr_pos.r = data.value;
        break;
      case 1:
        this.curr_pos.p = data.value;
        break;
      case 2:
        this.curr_pos.t = data.value;
        break;
      case 3:
        this.curr_pos.y = data.value;
      }
    });

    setInterval(() => {
      this.emit('position', this.curr_pos);
    }, refresh_rate || 500);
  };

  Command.prototype = Object.create(EventEmitter.prototype);

  return Command;
})();

module.exports = Joystick;
