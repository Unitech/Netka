var five = require("johnny-five");
// need to falsh arduino with PingFirmata (https://gist.githubusercontent.com/rwaldron/0519fcd5c48bfe43b827/raw/f17fb09b92ed04722953823d9416649ff380c35b/PingFirmata.ino)
var pmx = require('pmx');
var probe = pmx.probe();
var redis = require("redis");
var Engine = require('./engine.js');

var relay, led, proximity;

var board = new five.Board({
  repl : false
});

var sub = redis.createClient(), pub = redis.createClient();

var metric = probe.metric({
  name    : 'Distance'
});

var lat = probe.metric({
  name    : 'Latitude'
});

var lon = probe.metric({
  name    : 'Longitude'
});

var temp = probe.metric({
  name    : 'Temperature'
});

var pression = probe.metric({
  name    : 'Pressure'
});

function standard(val, indix) {
  if (!indix) indix = 10;
  return Math.round(val * indix) / indix;
}

sub.on("message", function (channel, message) {
  var data = JSON.parse(message);

  if (channel == 'barometer') {
    temp.set(standard(data.temp));
    pression.set(standard(data.pressure));
  }

  if (channel == 'gps') {
    lat.set(standard(data.lat, 10000));
    lon.set(standard(data.lon, 10000));
  }
});


sub.subscribe('gps');
sub.subscribe('barometer');

var engine = new Engine();

/**
 * Main
 */
board.on("ready", function() {

  proximity = new five.Proximity({
	  controller: "HCSR04",
	  pin: 7
  });

  relay = new five.Relay(10);
  led = new five.Led(11);

  relay.on();

  proximity.on("data", function() {
	  metric.set(this.cm);
  });

  var is_fading = false;

  pmx.action('fade', function(reply) {
    if (is_fading == false) {
      led.pulse(3200);
    }
    else
      led.stop().off();

    is_fading = !is_fading;
    reply(is_fading);
  });

  var is_runing = false;

  pmx.action('drone', function(reply) {
    if (is_runing == false) {
      relay.off();
    }
    else
      relay.on();

    is_runing = !is_runing;
    reply(is_fading);
  });

  var engine_on = false;

  pmx.action('engine', function(reply) {
    if (engine_on == false)
      engine.throttle(100);
    else
      engine.throttle(0);

    engine_on = !engine_on;
    reply(engine_on);
  });

  pmx.action('engineMax', function(reply) {
    if (engine_on == false)
      engine.throttle(250);
    else
      engine.throttle(0);

    engine_on = !engine_on;
    reply(engine_on);
  });
});
