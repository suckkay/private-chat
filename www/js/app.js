// Ionic Socket IO app

angular.module('starter', ['ionic', 'ngSanitize','btford.socket-io' , 'starter.controllers' , 'starter.services' , 'starter.directives'])

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

.config(function($stateProvider, $urlRouterProvider)
{

  $stateProvider
  .state('chat', {
    cache: false,
    url: "/chat/:nickname/:to/:roomid",
    templateUrl: "templates/chat.html",
    controller: 'ChatController',
  })
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: "LoginController",
  })
  .state('list', {
    url: "/list/:nickname",
    templateUrl: "templates/list.html",
    controller: "ListController",
  })

  ;
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})

