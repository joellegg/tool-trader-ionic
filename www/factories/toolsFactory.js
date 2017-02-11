factoryModule.factory('ToolsFactory', function($http) {
  return {
    getTools: () => {
      return $http.get('https://tool-trader.firebaseio.com/tools.json').then(res => res.data);
    },
    getUsers: () => {
      return $http.get('https://tool-trader.firebaseio.com/users.json').then(res => res.data);
    },
    newTool: (newTool) => {
      $http.post('https://tool-trader.firebaseio.com/tools.json', newTool).then(alert("Tool successfully added!"));
    }
  }
});
