factoryModule.factory('ToolsFactory', function($http) {
  return {
    getTools: () => {
      return $http.get('https://tool-trader.firebaseio.com/tools.json').then(res => res.data);
    }
  }
});
