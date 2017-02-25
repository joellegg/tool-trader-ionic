factoryModule.factory('MessageFactory', function($http, AuthFactory) {
  return {
    makeNewGroup: (data) => {
      return $http.post('https://tool-trader.firebaseio.com/chats.json', data);
    },
    addUserToGroup: (groupID, member) => {
      return $http.patch(`https://tool-trader.firebaseio.com/members/${groupID}.json`, member);
    },
    addGroupToUser: (key, group) => {
      return $http.patch(`https://tool-trader.firebaseio.com/users/${key}/groups.json`, group);
    },
    removeGroupFromUser: (user, group) => {
      return $http.delete(`https://tool-trader.firebaseio.com/users/${user}/groups/${group}.json`);
    },
    getChatGroups: (chatKey) => {
      return $http.get(`https://tool-trader.firebaseio.com/chats/${chatKey}.json`).then(res => res.data);
    },
    getMembers: (chatGroup) => {
      return $http.get(`https://tool-trader.firebaseio.com/members/${chatGroup}.json`).then(res => res.data);
    },
    getMessages: () => {
      return $http.get(`https://tool-trader.firebaseio.com/messages.json`).then(res => res.data);
      // ?orderBy="chat"&equalTo="${group}"
    },
    removeMessage: (key) => {
      return $http.delete(`https://tool-trader.firebaseio.com/messages/${key}.json`)
    }
  }
});
