'use strict';
var i2cBus        = require('i2c-bus');
var Pca9685Driver = require('pca9685').Pca9685Driver;
var fs            = require('fs');

class PWM {
  constructor() {
    var options = {
	    i2c       : i2cBus.openSync(1),
	    address   : 0x40,
	    frequency : 50,
	    debug     : false
    };

    // NAVIO+ specialized
    try {
      fs.appendFileSync('/sys/class/gpio/export', '27');
    } catch(e) {
      console.error(e);
    }

      var dt = fs.readFileSync('/sys/class/gpio/gpio27/direction')
      console.log(dt.toString());

      
    try {
	// Set pin as output?
	fs.writeFileSync('/sys/class/gpio/gpio27/direction', 'out');
	fs.writeFileSync('/sys/class/gpio/gpio27/value', '0');
    } catch(e) {
      console.error(e);
    }

    this.pwm = new Pca9685Driver(options, () => {
	    console.log('PWM initialization done');

	//this.setRange(3, 620);
	//this.setRange(4, 130);
	//this.setRange(5, 130);
	//this.setRange(6, 130);

    });

      return this;
  }

  /**
   * Set in MS
   */
  setPWM(chanel, pulse) {
    this.pwm.setPulseLength(chanel, pulse);
    // Set channel 0 to turn on on step 42 and off on step 255
    //pwm.setPulseRange(4, 0, 0);
  }

    setRange(chanel, pulse) {
	this.pwm.setPulseRange(chanel, 0, pulse);
    }
  setPulsePWM(chanel, pulse) {
    this.pwm.setPulseLength(chanel, pulse);
    // Set channel 0 to turn on on step 42 and off on step 255
    //pwm.setPulseRange(4, 0, 0);
  }

    armESC() {
	var self = this;

	(function arm(i)  {
	    //self.setPWM( MIN (1834, 1.12ms) 50 times
	})(50)
    }
}

module.exports = PWM;
