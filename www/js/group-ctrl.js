controllerModule.controller('GroupCtrl', function($scope, $location, MessageFactory, AuthFactory, $q) {
  // get message groups for current user
  messageRef.on('child_added', (childSnapshot, prevChildKey) => {
    console.log('child_added');
    console.log(childSnapshot, prevChildKey)
    // get new message-groups and add to the list
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
