
var API = module.exports = {
    'auth' : function() {
    },
    'welcome' : function() {
    },
    'cmd:rc:pwm' : function(data) {
	var perc = Math.floor((data.val / (32767 * 2)) * 1800);

	if (perc < 0) perc *= -1;
	
	console.log('bef',perc);
	perc += 900;
	// max 564
	if (data.act == 'pitch') {
	    console.log(perc);
	    //console.log((1.12 * 4096) / (1000 / 60) -1)
	    //console.log((2.3 * 4096) / (1000 / 60) -1)
	    this.pwm.setPWM(6, perc);
	}

	if (data.act == 'roll') {
	    this.pwm.setPWM(7, perc);
	}

	if (data.act == 'yaw') {
	    this.pwm.setPWM(8, perc);
	}

      //console.log(perc);
    }
};
