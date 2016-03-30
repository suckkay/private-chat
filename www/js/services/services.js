app.factory('User', function($http){
  var result = null;

  return {
    list: function(apiUrl,from,to){

      //return $http.jsonp(apiUrl + 'list-student?callback=telkomsel').success(function(data){
      //return $http.jsonp('http://195.110.58.109/api/tes.php').success(function(data){
      //return $http.jsonp('http://103.31.226.156:20062/bni/api/content?callback=JSON_CALLBACK&type=news').success(function(data){
      return $http.jsonp('http://103.31.226.156:20062/telkomsel/api/define-room-chat?callback=JSON_CALLBACK&from='+from+'&to='+to).success(function(data){
      //return $http.jsonp(apiUrl + 'student-detail?callback=JSON_CALLBACK&username=Hendro&token=2067&password=thedml123').success(function(data){
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


;