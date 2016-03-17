
var debug = require('debug')('drone:api');

var API = module.exports = {
    'auth' : function() {
    },
    'welcome' : function() {
    },
    'cmd:rc:pwm' : function(data) {
	var perc = Math.floor((data.val / (32767 * 2)) * 490);	
	perc += 130;
	
	// max 564
	if (data.act == 'throttle') {
	    debug('throttle: %d', perc);
	    this.pwm.setRange(3, perc);
	}

	if (data.act == 'pitch') {
	    debug('pitch: %d', perc);
	    this.pwm.setRange(4, perc);
	}

	if (data.act == 'yaw') {
	    debug('yaw: %d', perc);
	    this.pwm.setRange(5, perc);
	}

	if (data.act == 'roll') {
	    debug('roll: %d', perc);
	    this.pwm.setRange(6, perc);
	}

	if (data.act == 'action') {
	    this.pwm.setRange(7, 200);
	    this.pwm.setRange(7, 400);
	    this.pwm.setRange(7, 500);
	}
    }
};
