factoryModule.factory('MessageFactory', function($http) {
  return {
    makeNewGroup: (data) => {
      return $http.post('https://tool-trader.firebaseio.com/message-groups.json', data);
    },
    addUserToGroup: (groupID, uid) => {
      return $http.post(`https://tool-trader.firebaseio.com/message-groups/${groupID}/members.json`, data)
    }
  }
});
