var list = app.controller('ListController',function($stateParams,$state,$sanitize,$scope,socket, User, config) {
	var self=this

	var uname = $stateParams.nickname
	var unamec = $stateParams.vara
	self.st = "asd : "+uname+" "+unamec;

	self.privatechat=function(to){
		User.list(config.apiUrl, uname, to).success(function(data) {
    		console.log("dt room id "+data.data.room_id);
    		self.roomid = data.data.room_id;
    		window.localStorage['room_id'] = data.data.room_id;

			socket.emit('switchRoom', self.roomid);
			console.log('successfull adding room to '+self.roomid);
	  	}).error(function(){
	  		console.log("error")
		})
	  	


		$state.go('chat',{nickname:$stateParams.nickname, to:to, roomid:self.roomid}, {reload: true, notify:true})


	}
	self.nikitem = ['maman', 'didin', 'parjo'];
	self.nikitems=[];
	for (var i = 0; i < self.nikitem.length; i++) {
		if(self.nikitem[i] === uname ){
			console.log("sama "+uname)
			continue;
		}
    	self.nikitems.push(self.nikitem[i]);
	}
});
