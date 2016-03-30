var list = app.controller('ListController',function($stateParams,$state,$sanitize,$scope,socket) {
	var self=this

	/*var uname = "me"
	self.st = "asd : "+uname+" "+mp;
*/
	self.privatechat=function(){
		$state.go('chat',{nickname:"me"})
	}
	//console.log("asdasd: "+uname)
	/*socket.on('connect',function(){
		 connected = true
  	 
  	  //Add user
  	  socket.emit('add user', $stateParams.nickname);
  	  //socket.emit('subscribe', $stateParams.nickname);
  	  socket.emit('listuser', $stateParams.nickname);

  	  socket.on('listuser', function (data) {
  	  	self.nikitems = ['1', '2', '3'];

	    //self.st = data.users;
	  	
	  });

	})
	*/
});
