app.factory('toolsFactory', function($http) {
  return {
    getTools: () => {
      return $http.get('https://tool-trader.firebaseio.com/tools.json');
    }
  }
})
