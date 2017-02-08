angular.module('starter.factories', [])

.factory('ToolsFactory', function($http) {
  return {
    getTools: () => {
      return $http.get('https://tool-trader.firebaseio.com/tools.json').then(res => res.data);
    },
    addToolImage: (img) => {
      $http.post('https://tool-trader.firebaseio.com/tools.json', img);
    }
  }
});
