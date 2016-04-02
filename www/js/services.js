'use strict';

angular.module('starter.services', [])

.factory('User', function($http){
  var result = null;

  return {
    list: function(apiUrl,from,to){


      return $http.jsonp(apiUrl+'define-room-chat?callback=JSON_CALLBACK&from='+from+'&to='+to).success(function(data){
        result = data;
        return result;
      }).
      error(function (data) {
        result = [{
          code: 0,
          status: 'nok',
        }];

        return result;
      });

    }
  }
})
.factory('socket',function(socketFactory){
  return socketFactory({
    // prefix: 'foo~',
    ioSocket: io.connect('http://103.31.226.156:40062/')
  });
  // var myIoSocket = io.connect();

  //   mySocket = socketFactory({
  //     ioSocket: myIoSocket
  //   });
    
  // return mySocket;
})

;