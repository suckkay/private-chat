// Ionic Socket IO app

var app=angular.module('ionic-socketio-chat-client', ['ionic', 'ngSanitize','btford.socket-io'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
})
.config(function($stateProvider, $urlRouterProvider)
{

  $stateProvider
  .state('chat', {
    cache: false,
    url: "/chat/:nickname/:to/:roomid",
    templateUrl: "templates/chat.html"
  })
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html"
  })
  .state('list', {
    url: "/list/:nickname",
    templateUrl: "templates/list.html"
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})

.constant('config', {
    appName: 'Chat',
    appVersion: '1.0',
    apiUrl: 'http://103.31.226.156:20062/telkomsel/api/',
    apiUrl2: 'http://mockup.metradigitalmedia.com/template/api/ui/',
})
