var PololuMaestro = require('pololu-maestro');

function connectToMaestro(cb) {
  PololuMaestro.find(PololuMaestro.SERIAL_MODES.USB_CHAINED, function(error, maestro) {
    if (error)
      throw new Error('Cannot find device (/dev/ttyACMx)');

    console.log('[+] Connected to device');
      //maestro.reset();

    maestro.on('disconnected', function() {
      console.log('[-] Disconnected');
    });

    return cb(null, maestro);
  });
}

function setVal(maestro, value) {
    console.log('Setting value %d', value);
    maestro.set8BitTarget(0, value);
    maestro.set8BitTarget(1, value);
    maestro.set8BitTarget(2, value);
    maestro.set8BitTarget(3, value);
}


function calibrate(maestro) {
    var readline = require('readline');

    var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
    });

    var i = 0;

    
    console.log('Calibration started');
    
    rl.on('line', function (cmd) {

	var channel = i++;
	
	if (channel < 4) {
	    console.log('moving channel = ', channel);
 	    setTimeout(function() {
		maestro.set8BitTarget(channel, 0);
		setTimeout(function() {
		    maestro.set8BitTarget(channel, 127);
		    setTimeout(function() {
			console.log('Done 254');
			maestro.set8BitTarget(channel, 254);
		    }, 200);
		}, 200);
	    }, 200);
	}
	else if (channel == 4) {
	    console.log('Set to neutral');
	    setVal(maestro, 127);	    
	}
	else if (channel >= 5) {
	    var c_chan = channel - 5;
	    
	    console.log('extreme channel = ', c_chan);
	    
	    setTimeout(function() {
		maestro.set8BitTarget(c_chan, 0);
		setTimeout(function() {
		    maestro.set8BitTarget(c_chan, 127);
		    setTimeout(function() {
			console.log('Done 254');
			maestro.set8BitTarget(c_chan, 254);
		    }, 200);
		}, 200);
	    }, 200);
	}
    });
}

function main() {
    
    connectToMaestro(function(err, maestro) {

	process.on('SIGINT', function() {
	    console.log('All to 0');
	    setVal(maestro, 0);
	    setTimeout(function() {
		setVal(maestro, 0);
		process.exit(0);
	    }, 100);
	});
	
	setTimeout(function() {
	    maestro.set8BitTarget(0, 250);
	}, 1000);
	setVal(maestro, 0);
	//calibrate(maestro);
      //maestro.set8BitTarget(0, 250);
      //setVal(maestro, 250);
      //waitStding(maestro);
      
    // var i = 0;

    //   setInterval(function() {
    // 	  maestro.set8BitTarget(1, i++ % 2 ? 20 : 180);
    // }, 1000);
  });
}


main();
