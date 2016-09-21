

var five = require("johnny-five");
var board = new five.Board();

var stress_mode = false;

var relay, led, proximity;

function movementDetected() {
    relay.off();
    stress_mode = true;
    led.pulse(400);    
    setTimeout(function() {
	    led.pulse(3200);
	stress_mode = false;
	relay.on();
    }, 10000);
}

board.on("ready", function() {
    var default_distance = null;

    relay = new five.Relay(10);
    led = new five.Led(11);
    proximity = new five.Proximity({
	controller: "HCSR04",
	pin: 7
    });
    
    relay.on();
    led.pulse(3200);

    proximity.on("data", function() {

	if (!default_distance) {
	    console.log('Distance calibration = %scm', this.cm)
	    default_distance = this.cm;
	}

	if (stress_mode == true)
	    return false;
	
	if (this.cm < default_distance - (default_distance / 5)) {
	    console.log('Someone is there, spy on');
	    stress_mode = true;
	    movementDetected()
	}
    });


});
