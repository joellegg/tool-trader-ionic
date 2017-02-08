// var config = {
//   apiKey: "AIzaSyBtisZZHzrnlDLYpQ73Jz5Oq_p1-7712Vg",
//   authDomain: "tool-trader.firebaseapp.com",
//   databaseURL: "https://tool-trader.firebaseio.com",
//   storageBucket: "tool-trader.appspot.com",
//   messagingSenderId: "167198110300"
// };
// firebase.initializeApp(config);


angular.module('ionicApp', ['ionic', 'starter.controllers', 'starter.factories'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "partials/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "partials/home.html",
          controller: "ToolSearchCtrl"
        }
      }
    })
    .state('tabs.toolRental', {
      url: "/toolRental",
      views: {
        'home-tab': {
          templateUrl: "partials/toolRental.html"
        }
      }
    })
    .state('tabs.messages', {
      url: "/messages",
      views: {
        'messages-tab': {
          templateUrl: "partials/messages.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'messages-tab': {
          templateUrl: "partials/nav-stack.html"
        }
      }
    })
    .state('tabs.profile', {
      url: "/profile",
      views: {
        'profile-tab': {
          templateUrl: "partials/profile.html"
        }
      }
    })
    .state('tabs.calendar', {
      url: "/calendar",
      views: {
        'calendar-tab': {
          templateUrl: "partials/calendar.html"
        }
      }
    });

  $urlRouterProvider.otherwise("/tab/home");

})
