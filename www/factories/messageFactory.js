factoryModule.factory('MessageFactory', function($http, AuthFactory) {
  return {
    makeNewGroup: (data) => {
      return $http.post('https://tool-trader.firebaseio.com/message-groups.json', data);
    },
    addUserToGroup: (groupID, member) => {
      return $http.post(`https://tool-trader.firebaseio.com/message-groups/${groupID}/members.json`, member)
    },
    getUsersGroups: (subject) => {
      return $http.get(`https://tool-trader.firebaseio.com/message-groups.json?orderBy="subject"&equalTo="${subject}"`)
        debugger
        // .then((res) => {
        //   console.log(res.data);
        // })
    }
  }
});
