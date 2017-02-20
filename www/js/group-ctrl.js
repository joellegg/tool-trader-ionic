controllerModule.controller('GroupCtrl', function($scope, $location, MessageFactory, AuthFactory, $q) {
  let userGroups = {};
  $scope.usersChats = [];

  // get users chat groups
  AuthFactory.getUserKey(AuthFactory.getUserId())
    .then((key) => {
      userGroups = userRef.child(key + '/groups');
    })
    // listen for new groups added
    .then(() => {
      userGroups.on('child_added', (snapshot, prevChildKey) => {
        console.log('child_added', snapshot.key);
        // get details of each group member is a part of
        MessageFactory.getChatGroups(snapshot.key).then((response) => {
          $scope.usersChats.push(response);
          console.log($scope.usersChats);
        })
      })
    })

  // get group details using the snapshot.key



  // get message groups for current user
  messageRef.on('child_added', (snapshot, prevChildKey) => {
    console.log('child_added', snapshot.val(), prevChildKey);
    // get chats user is part of
    // loop through members then chats

  })

  // currentGamesRef.on('child_added', () => {
  //   console.log("child_added")
  //   LiveGamesFactory.getCurrentGameList()
  //     .then((gameList) => {
  //       $scope.currentGames = gameList
  //         // $scope.selectedGame = $scope.gameNameList[0]
  //       $scope.$apply()
  //     })
  // })

  // MessageFactory.getUsersGroups("Drill").then((res) => {
  //   console.log(res)
  // })
})
