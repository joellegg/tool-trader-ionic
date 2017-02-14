factoryModule.factory('ToolsFactory', function($http) {
  let searchParams = [];

  return {
    getTools: () => {
      return $http.get('https://tool-trader.firebaseio.com/tools.json').then(res => res.data);
    },
    getUsers: () => {
      return $http.get('https://tool-trader.firebaseio.com/users.json').then(res => res.data);
    },
    newTool: (newTool) => {
      $http.post('https://tool-trader.firebaseio.com/tools.json', newTool).then(alert("Tool successfully added!"));
    },
    updateTool: (key, data) => {
      return $http.patch(`https://tool-trader.firebaseio.com/tools/${key}.json`, data);
    },
    removeTool: (key) => {
      return $http.delete(`https://tool-trader.firebaseio.com/tools/${key}.json`).then(alert("The tool has been removed from your shed."))
    },
    setSearchParams: (data) => {
      searchParams = data;
    },
    getSearchParams: () => {
      return searchParams;
    }
  }
});
