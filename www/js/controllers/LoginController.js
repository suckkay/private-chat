app.controller('LoginController',function($state,$sanitize,config,User,socket) {
	var self=this
 	self.nikitems = ['maman', 'didin', 'parjo'];
	console.log("configname "+config.appName);
	/*User.list(config.apiUrl).success(function(data) {
    	console.log("dt cug "+data.data.room_id);
  	}).error(function(){
  		console.log("error")
	})*/
	


	self.join=function(nickname)
	{
		//sanitize the nickname
		//var nickname=$sanitize(self.nickname)
		
			socket.emit('adduser',nickname);
			window.localStorage['user_id'] = nickname;
			console.log('successfull adding'+nickname);
			$state.go('list',{nickname:nickname});
	}
	  
	
});
