factoryModule.factory('ToolsFactory', function($http) {
  let searchParams = [];
  let availableTools = [];

  return {
    getTools: () => {
      return $http.get('https://tool-trader.firebaseio.com/tools.json').then(res => res.data);
    },
    getUsers: () => {
      return $http.get('https://tool-trader.firebaseio.com/users.json').then(res => res.data);
    },
    newTool: (newTool) => {
      $http.post('https://tool-trader.firebaseio.com/tools.json', newTool);
    },
    updateTool: (key, data) => {
      return $http.patch(`https://tool-trader.firebaseio.com/tools/${key}.json`, data);
    },
    removeTool: (key) => {
      return $http.delete(`https://tool-trader.firebaseio.com/tools/${key}.json`).then(alert("The tool has been removed from your shed."));
    },
    setSearchParams: (data) => {
      searchParams = data;
    },
    getSearchParams: () => {
      return searchParams;
    },
    setAvailableTools: (tools) => {
      availableTools = tools;
    },
    getAvailableTools: () => {
      return availableTools;
    },
    toolAddReservation: (key, reservation) => {
      return $http.post(`https://tool-trader.firebaseio.com/tools/${key}/reserved.json`, reservation);
    },
    userNewReservation: (user, reservation) => {
      return $http.post(`https://tool-trader.firebaseio.com/users/${user}/reservations.json`, reservation);
    },
    getUsersTools: (owner) => {
      return $http.get(`https://tool-trader.firebaseio.com/tools.json?orderBy="owner"&equalTo="${owner}"`).then((res) => {
        let response = res.data;
        let userTools = [];
        for (key in response) {
          userTools.push(response[key])
        };
        return userTools;
      })
    },
    getTool: (toolKey) => {
      return $http.get(`https://tool-trader.firebaseio.com/tools/${toolKey}.json`).then(res => res.data)
    }
  }
});
