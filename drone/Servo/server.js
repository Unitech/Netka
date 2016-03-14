var nssocket = require('nssocket');

//
// Create an `nssocket` TCP server
//
var server = nssocket.createServer(function (socket) {
    socket.data(['cmd'], function (data) {
	console.dir(data);
    })
});

server.listen(9876);