
var Client = {
    init : function(cb) {
	this.socket = new nssocket.NsSocket({
	    type : 'tcp4'
	});

	this.socket.on('error', function(e) {
	    console.error(e);
	});

	this.socket.on('close', function() {
	    console.log('Connection closed', arguments);
	});

	this.socket.on('reconnecting', function() {
	});

	this.socket.on('start', function() {
	    console.log('Connection established'
	});
	

    }
};
