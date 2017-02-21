controllerModule.controller('GroupCtrl', function($scope, $location, MessageFactory, AuthFactory, $q) {
  $scope.currentUid = AuthFactory.getUserId();

  let userGroups = {};
  let chatImage = {};
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
        // console.log('child_added', snapshot.key);
        // get details of each group the member belongs to
        MessageFactory.getChatGroups(snapshot.key)
          .then((response) => {
            response.groupKey = snapshot.key;
            let x = new Date(response.timeStamp);
            response.timeStamp = x.toLocaleString();
            // get chat group members
            MessageFactory.getMembers(snapshot.key).then((res) => {
              for (user in res) {
                // console.log(user);
                // get the first name of the members that are not the current user
                if (user !== $scope.currentUid) {
                  AuthFactory.getRecipientInfo(user).then((res) => {
                    // console.log(res.firstName, res.lastName);
                    response.name = res.firstName + ' ' + res.lastName;
                    $scope.usersChats.push(response);
                  })
                }
              }
            })
          })
      })
    })
    .then(() => {
      console.log($scope.usersChats)
    })

  $scope.changeRoute = (groupKey) => {
    $location.url(`/messages/${groupKey}`)
  }

  // update chat time stamp for users groups
  // chatRef.on()

})
