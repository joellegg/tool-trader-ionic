factoryModule.factory('MessageFactory', function($http, AuthFactory) {
  return {
    makeNewGroup: (data) => {
      return $http.post('https://tool-trader.firebaseio.com/chats.json', data);
    },
    addUserToGroup: (groupID, member) => {
      return $http.put(`https://tool-trader.firebaseio.com/members/${groupID}.json`, member)
    },
    addGroupToUser: (key, group) => {
      return $http.put(`https://tool-trader.firebaseio.com/users/${key}/groups.json`, group)
    },
    getUsersGroups: (subject) => {
      return $http.get(`https://tool-trader.firebaseio.com/message-groups.json?orderBy="subject"&equalTo="${subject}"`)
        debugger
    },
  }
});
