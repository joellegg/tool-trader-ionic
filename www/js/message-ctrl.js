controllerModule.controller('MessageCtrl', function($scope, $location, $stateParams, AuthFactory, ToolsFactory) {

  $scope.currentUser;
  let chatGroup = $stateParams.chatgroup;
  $scope.messages = [];

  AuthFactory.getUser().then((res) => { $scope.currentUser = res });

  // get message groups for current user
  messageRef.on('child_added', (snapshot, prevChildKey) => {
    // console.log('child_added', snapshot.val(), snapshot.key);
    // get messages related to the current chat room
    if (snapshot.val().chat === chatGroup) {
      // add to array
      let message = snapshot.val();
      message.key = snapshot.key;
      $scope.messages.push(message)
    }
    $scope.$apply();
    // console.log($scope.messages)
  })

  $scope.addMessage = () => {
    // let timeStamp = new Date();
    $scope.newMessage = {
      "chat": chatGroup,
      "message": $scope.message,
      "author": $scope.currentUser,
      "timeStamp": (new Date()).toISOString(),
    }
    // console.log('new message', $scope.newMessage);

    messageRef.push($scope.newMessage);
    // $scope.$apply();
    $scope.message = '';
  }
});
