var i2cBus = require("i2c-bus");
var Pca9685Driver = require("pca9685").Pca9685Driver;

var fs = require('fs');

function start() {

  var options = {
	  i2c: i2cBus.openSync(1),
	  address: 0x40,
	  frequency: 490,
	  debug: false
  };
  pwm = new Pca9685Driver(options, function() {
	  console.log("Initialization done");
  });

  // Set channel 0 to turn on on step 42 and off on step 255
  //pwm.setPulseRange(4, 0, 0);

  // Set the pulse length to 1500 microseconds for channel 2
  //pwm.setPulseLength(4, 1117);

  (function rec(pwm_val) {
	  pwm.setPulseLength(4, pwm_val);
	  pwm_val += 5;
	  console.log(pwm_val);
	  setTimeout(rec.bind(null, pwm_val), 500);
  })(1130);

  // Set the duty cycle to 25% for channel 8
  //pwm.setDutyCycle(8, 0.25);
}

fs.appendFile('/sys/class/gpio/export', '27', function(err) {
  console.log(err);
  fs.writeFile('/sys/class/gpio/gpio27/value', "0", function(err) {
	  console.log(err);
	  start();
  })
});
