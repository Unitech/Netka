'use strict';

var i2cBus        = require('i2c-bus');
var Pca9685Driver = require('pca9685').Pca9685Driver;
var fs            = require('fs');

class PWM {
  constructor() {
    var options = {
	    i2c       : i2cBus.openSync(1),
	    address   : 0x40,
	    frequency : 60,
	    debug     : false
    };

    // NAVIO+ specialized
    try {
      fs.appendFileSync('/sys/class/gpio/export', '27');
    } catch(e) {
      //console.error(e);
    }

    try {
      fs.writeFileSync('/sys/class/gpio/gpio27/value', '0');
    } catch(e) {
      //console.error(e);
    }

    this.pwm = new Pca9685Driver(options, function() {
	    console.log('PWM initialization done');
    });
  }

  /**
   * Set in MS
   */
  setPWM(chanel, pulse) {
    this.pwm.setPulseLength(chanel, pulse);

    // Set channel 0 to turn on on step 42 and off on step 255
    //pwm.setPulseRange(4, 0, 0);
  }
}

module.exports = PWM;
