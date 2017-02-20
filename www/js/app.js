// initialize firebase
var config = {
  apiKey: "AIzaSyBtisZZHzrnlDLYpQ73Jz5Oq_p1-7712Vg",
  authDomain: "tool-trader.firebaseapp.com",
  databaseURL: "https://tool-trader.firebaseio.com",
  storageBucket: "tool-trader.appspot.com",
  messagingSenderId: "167198110300"
};
firebase.initializeApp(config);

// firebase realtime
const messageRef = firebase.database().ref('messages');
const userRef = firebase.database().ref('users');


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
    .state('results', {
      url: "/results",
      templateUrl: "partials/search-results.html",
      controller: "ResultsSearchCtrl",
      resolve: {
        availableTools(ToolsFactory) {
          return ToolsFactory.getAvailableTools();
        },
        user(AuthFactory, $state) {
          return AuthFactory.getUser().catch(() => {
            $state.go('authorize')
          })
        }
      }
    })
    .state('messages', {
      url: "/messages",
      templateUrl: "partials/message-portal.html",
      controller: "MessageCtrl"
    })
    .state('tabs', {
      cache: false,
      url: "/tab",
      abstract: true,
      templateUrl: "partials/tabs.html",
      resolve: {
        user(AuthFactory, $state) {
          return AuthFactory.getUser().catch(() => {
            $state.go('authorize')
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
    .state('tabs.groups', {
      url: "/groups",
      views: {
        'groups-tab': {
          templateUrl: "partials/groups.html",
          controller: "GroupCtrl"
        }
      }
      // resolve: {
      //   groups(MessageFactory) {
      //     return MessageFactory.getUsersGroups();
      //   }
      // }
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
