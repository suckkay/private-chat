app.factory('socket',function(socketFactory){
	//Create socket and connect to http://chat.socket.io 
 	//var myIoSocket = io.connect('http://chat.socket.io');
 	//var myIoSocket = io.connect('http://222.124.185.218/');
 	var myIoSocket = io.connect('http://103.31.226.156:40062/');

  	mySocket = socketFactory({
    	ioSocket: myIoSocket
  	});
  	
	return mySocket;
})
