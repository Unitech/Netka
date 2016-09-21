var redis = require("redis");
var sub = redis.createClient(), pub = redis.createClient();

sub.on("message", function (channel, message) {
    console.log(JSON.parse(message));
});

sub.subscribe('gps');
