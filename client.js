
var nssocket = require('nssocket');
var outbound = new nssocket.NsSocket();

//outbound.data(['you', 'there'], function () {

//});

outbound.connect(9876, '192.168.0.14');

outbound.on('start', function() {
  outbound.send(['cmd'], { iam: true, indeedHere: true });
});
