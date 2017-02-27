controllerModule.controller('GroupCtrl', function($scope, $location, MessageFactory, AuthFactory, $q) {
  $scope.currentUid = AuthFactory.getUserId();
  $scope.listCanSwipe = true;

  let userGroups = {};
  let recipients = [];
  $scope.usersChats = [];


  // get users chat groups
  AuthFactory.getUserKey($scope.currentUid)
    .then((key) => {
      userGroups = userRef.child(key + '/groups');
    })
    // listen for new groups added
    .then(() => {
      userGroups.on('child_added', (snapshot, prevChildKey) => {
        // get details of each group the member belongs to
        MessageFactory.getChatGroups(snapshot.key)
          .then((response) => {
            response.groupKey = snapshot.key;
            let x = new Date(response.timeStamp);
            response.timeStamp = x.toLocaleString();
            // get chat group members
            MessageFactory.getMembers(snapshot.key).then((res) => {
              for (user in res) {
                // get the first name of the members that are not the current user
                if (user !== $scope.currentUid) {
                  AuthFactory.getRecipientInfo(user).then((res) => {
                    response.name = res.firstName + ' ' + res.lastName;
                    // add the data to the usersChats reference to post to DOM
                    $scope.usersChats.push(response);
                  })
                }
              }
            })
          })
      })
    })

  $scope.changeRoute = (groupKey) => {
    $location.url(`/messages/${groupKey}`)
  }

  $scope.deleteChat = (group) => {
    // remove chat from firebase
    chatRef.child(group).remove();
    memberRef.child(group).remove();
    // remove messages from firebase
    MessageFactory.getMessages(group).then((response) => {
      for (key in response) {
        if (response[key].chat === group) {
          MessageFactory.removeMessage(key);
        }
      }
    });
    // remove group from user
    MessageFactory.removeGroupFromUser($scope.currentUid, group);
    // remove group from tool owner
    // remove from local storage
    for (i = 0; i < $scope.usersChats.length; i++) {
      if (group === $scope.usersChats[i].groupKey) {
        console.log(i);
        $scope.usersChats.splice(i, 1)
      }
    }
  }

})
