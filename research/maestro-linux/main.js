var PololuMaestro = require('pololu-maestro');

function connectToMaestro(cb) {
  PololuMaestro.find(PololuMaestro.SERIAL_MODES.USB_CHAINED, function(error, maestro) {
    if (error)
      throw new Error('Cannot find device (/dev/ttyACMx)');

    console.log('[+] Connected to device');
    maestro.reset();

    maestro.on('disconnected', function() {
      console.log('[-] Disconnected');
    });

    return cb(null, maestro);
  });
}

function main() {
  connectToMaestro(function(err, maestro) {

    var i = 0;

    setInterval(function() {
      maestro.set8BitTarget(1, i++ % 2 ? 20 : 180);
    }, 1000);
  });
}


main();
