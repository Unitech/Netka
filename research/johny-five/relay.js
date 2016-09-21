var five = require("johnny-five");
var board = new five.Board();
var readline = require('readline');

// https://github.com/rwaldron/johnny-five/wiki/Relay
board.on("ready", function() {
    var relay = new five.Relay(10);


    var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
    });
    
    console.log('Calibration started');
    
    rl.on('line', function (cmd) {
	relay.toggle();
    });
    // setInterval(function() {
    
	
    //}, 1000);
    
    // Control the relay in real time
    // from the REPL by typing commands, eg.
    //
    // relay.on();
    //
    // relay.off();
    //
    // OR...
    //
    // relay.open();
    //
    // relay.close();
    //
    //this.repl.inject({
//	relay: relay
  //  });
});
