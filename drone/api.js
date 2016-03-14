
var API = module.exports = {
    'auth' : function() {
    },
    'welcome' : function() {
    },
    'cmd:rc:pwm' : function(data) {
      console.log(data);
      //console.log(this.welcomeMessage);
      var perc= (data.val / 32767) * 4000;

      if (perc < 0) perc *= -1;
      console.log(perc);
      //this.pwm.setPulseLength(4, perc);

      //console.log(perc);
    }
};
