var five = require("johnny-five");
var board = new five.Board();
// need to falsh arduino with PingFirmata (https://gist.githubusercontent.com/rwaldron/0519fcd5c48bfe43b827/raw/f17fb09b92ed04722953823d9416649ff380c35b/PingFirmata.ino)

board.on("ready", function() {
    var proximity = new five.Proximity({
	controller: "HCSR04",
	pin: 7
    });

    proximity.on("data", function() {
	process.stdout.write('\033c');
 	process.stdout.write('cm: ' + this.cm + '\n');
	process.stdout.write('in: ' + this.in);
    });

    
    
    proximity.on("change", function() {
	//console.log("The obstruction has moved.");
    });
});
