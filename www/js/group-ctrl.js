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

  // remove chat from firebase and from local storage
  // remove group from user and remove messages
  $scope.deleteChat = (group) => {
    // chatRef.child(group).remove();
    // memberRef.child(group).remove();
    let chatMessages = messageRef.orderBy('chat').equalTo(group);
    // chatMessages.remove();
    console.log(chatMessages)
    // messageRef.equalTo(group).remove();
    // for (i = 0; i < $scope.usersChats.length; i++) {
    //   if (group === $scope.usersChats[i].groupKey) {
    //     console.log(i);
    //     $scope.usersChats.splice(i, 1)
    //   }
    // }
  }

})
