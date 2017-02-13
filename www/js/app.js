// initialize firebase
var config = {
  apiKey: "AIzaSyBtisZZHzrnlDLYpQ73Jz5Oq_p1-7712Vg",
  authDomain: "tool-trader.firebaseapp.com",
  databaseURL: "https://tool-trader.firebaseio.com",
  storageBucket: "tool-trader.appspot.com",
  messagingSenderId: "167198110300"
};
firebase.initializeApp(config);

// allow anonymous sign in for now
// firebase.auth().signInAnonymously()
//   .then(function(_auth) {
//     // alert('Logged in!')
//   })
//   .catch(function(error) {
//     // handle any errors
//     let errorCode = error.code;
//     let errorMessage = error.message;

//     alert(errorMessage)
//   })


let controllerModule = angular.module('starter.controllers', [])
let factoryModule = angular.module('starter.factories', [])

let myApp = angular.module('ionicApp', ['ionic', 'ngCordova', 'starter.controllers', 'starter.factories'])

myApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('authorize', {
      url: "/authorize",
      templateUrl: "partials/auth.html",
      controller: "AuthCtrl"
    })
    .state('login', {
      url: "/login",
      templateUrl: "partials/login.html",
      controller: "AuthCtrl"
    })
    .state('register', {
      url: "/register",
      templateUrl: "partials/register.html",
      controller: "AuthCtrl"
    })
    .state('search', {
      url: "/search",
      templateUrl: "partials/tool-search.html",
      controller: "ToolSearchCtrl",
      resolve: {
        tools(ToolsFactory) {
          return ToolsFactory.getTools();
        }
      }
    })
    .state('tabs', {
      cache: false,
      url: "/tab",
      abstract: true,
      templateUrl: "partials/tabs.html",
      resolve: {
        user(AuthFactory, $location) {
          return AuthFactory.getUser().catch(() => {
            $location.url('/authorize')
          })
        }
      }
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "partials/home.html",
          controller: "AddToolCtrl"
        }
      },
      resolve: {
        tools(ToolsFactory) {
          return ToolsFactory.getTools();
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
    .state('tabs.profile', {
      url: "/profile",
      views: {
        'profile-tab': {
          templateUrl: "partials/profile.html",
          controller: 'ProfileCtrl'
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
