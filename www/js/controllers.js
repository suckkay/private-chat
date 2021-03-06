angular.module('starter.controllers', [])
.constant('config', {
    appName: 'Chat',
    appVersion: '1.0',
    apiUrl: 'http://103.31.226.156:20062/telkomsel/api/',
    apiUrl2: 'http://mockup.metradigitalmedia.com/template/api/ui/',
})


.controller('ChatController', function(socket, $stateParams,$sanitize,$ionicScrollDelegate,$timeout, User, config, $ionicLoading , $scope) {
	
  	var self=this;

  	var  socket = io.connect('http://103.31.226.156:40062/');
  		socket.emit('adduser', $stateParams.nickname);
	  	socket.emit('switchRoom', window.localStorage['room_id']);
  	var typing = false;
  	var lastTypingTime;
  	var TYPING_TIMER_LENGTH = 400;
  	
  	//Add colors
  	var COLORS = [
	    '#e21400', '#91580f', '#f8a700', '#f78b00',
	    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
	    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
	  ];

	
	$timeout(function () {
		if(window.localStorage['reloaded'] == "false"){
			window.localStorage['reloaded'] = "true";
			window.location.reload(true);
		}
	 	
	  }, 1000);

	setInterval(function(){ sendUpdateTyping();console.log('realoaded'); }, 2000);
  
	self.messages=[];
		
	  	socket.on('updateMessage', function (data) {
			if(data.message&&data.username)
		  	{
		   		addMessageToList(data.username,true,data.message)
		  	}
			// console.log('data from server chats readed '+data.username);
			});

			socket.on('typing', function (data) {
			    addChatTyping(data);
			});

			socket.on('stop typing', function (data) {
			    removeChatTyping(data.username);
			  });
  	
  	
	socket.on('connect',function(){
		// reconnection = true
		connected = true;
		self.connected = true;
  	  	// console.log('io coneected');
  		// socket.emit('adduser', $stateParams.nickname);
  		// socket.emit('switchRoom', window.localStorage['room_id']);

  // 		socket.on('updateMessage', function (data) {
	 //  		if(data.message&&data.username)
		//   	{
		//    		addMessageToList(data.username,true,data.message)
		//   	}
		// 	console.log('data from server chats readed '+data.username);
		// });

		socket.on('typing', function (data) {
		    addChatTyping(data);
		});

		socket.on('stop typing', function (data) {
		    removeChatTyping(data.username);
		  });	
	  	});

  	
  	//function called when user hits the send button
  	self.sendMessage=function(){
  		// socket.on('connect',function(){});
  		socket.emit('sendchat', {
		    message: self.message

		});
		console.log(self.message+' ini kebaca diketik oleh '+window.localStorage['user_id']+' di room '+ window.localStorage['room_id']);
  		socket.emit('stop typing');
  		self.message = ""
  	}

  	//function called on Input Change
  	self.updateTyping=function(){
  		// console.log('user update typing');
  		sendUpdateTyping()
  	}

  	// Display message by adding it to the message list
  	function addMessageToList(username,style_type,message){
  		username = $sanitize(username)
  		removeChatTyping(username)
  		var color = style_type ? getUsernameColor(username) : null
  		self.messages.push({content:$sanitize(message),style:style_type,username:username,color:color})
  		$ionicScrollDelegate.scrollBottom();
  		// console.log(username+'  -  '+message+' data should be updated')
  	}

  	//Generate color for the same user.
  	function getUsernameColor (username) {
	    // Compute hash code
	    var hash = 7;
	    for (var i = 0; i < username.length; i++) {
	       hash = username.charCodeAt(i) + (hash << 5) - hash;
	    }
	    // Calculate color
	    var index = Math.abs(hash % COLORS.length);
	    return COLORS[index];
  	}

  	// Updates the typing event
  	function sendUpdateTyping(){
  		if(self.connected){
  			// console.log('ini siapa ya '+self.connected);
  			if (!typing) {
		        typing = true;
		        socket.emit('typing');
		    }
  		}
  		lastTypingTime = (new Date()).getTime();
  		$timeout(function () {
	        var typingTimer = (new Date()).getTime();
	        var timeDiff = typingTimer - lastTypingTime;
	        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
	          socket.emit('stop typing');
	          // console.log('this running becouse of emiting ');
	          typing = false;
	        }
      	}, TYPING_TIMER_LENGTH)
  	}

	// Adds the visual chat typing message
	function addChatTyping (data) {
		if(data.username != $stateParams.nickname){
			addMessageToList(data.username,true," is typing");	
		}
	    
	}

	// Removes the visual chat typing message
	function removeChatTyping (username) {
	  	self.messages = self.messages.filter(function(element){return element.username != username || element.content != " is typing"})
	}

  	// Return message string depending on the number of users
  	function message_string(number_of_users)
  	{
  		return number_of_users === 1 ? "there's 1 participant":"there are " + number_of_users + " participants"
  	}
})

.controller('ListController',function($stateParams,$state,$sanitize,$scope,socket, User, config) {
	var self=this

	var uname = $stateParams.nickname
	var unamec = $stateParams.vara
	self.st = "asd : "+uname+" "+unamec;

	self.privatechat=function(to){
		User.list(config.apiUrl, uname, to).success(function(data) {
    		console.log("dt room id "+data.data.room_id);
    		self.roomid = data.data.room_id;
    		window.localStorage['room_id'] = data.data.room_id;
    		window.localStorage['to'] = data.data.room_id;
    		window.localStorage['reloaded'] = "false";
    		console.log(window.localStorage['reloaded'])
    		// socket.emit('switchRoom', self.roomid);
   //  		socket.emit('adduser',uname);
			// socket.emit('switchRoom', self.roomid);
			console.log($stateParams.nickname + ' successfull adding room to '+self.roomid+ ' and chat to '+ to);
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
})

.controller('LoginController',function($state,$sanitize,config,User,socket) {
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
		
			// socket.emit('adduser',nickname);
			window.localStorage['user_id'] = nickname;
			// console.log('successfull adding'+nickname);
			$state.go('list',{nickname:nickname});
	}
	  
	
})
;