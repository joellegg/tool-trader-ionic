controllerModule.controller('GroupCtrl', function($scope, $location, MessageFactory, AuthFactory, $q) {
  // get users chat groups
  var userGroups = messageRef.child('currentuser')

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

  MessageFactory.getUsersGroups("Drill").then((res) => {
    console.log(res)
  })
})
