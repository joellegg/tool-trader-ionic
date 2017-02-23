controllerModule.controller('MessageCtrl', function($scope, $location, $stateParams, $ionicScrollDelegate, $cordovaKeyboard, AuthFactory, ToolsFactory, $timeout) {
  $cordovaKeyboard.disableScroll(true)

  $scope.currentUser;
  let chatGroup = $stateParams.chatgroup;
  $scope.messages = [];

  AuthFactory.getUser().then((res) => { $scope.currentUser = res });
  let currentChat = chatRef.child(chatGroup + '/timeStamp');

  // get message groups for current user
  messageRef.on('child_added', (snapshot, prevChildKey) => {
    // get messages related to the current chat room
    if (snapshot.val().chat === chatGroup) {
      // add to array
      let message = snapshot.val();
      message.key = snapshot.key;
      $scope.messages.push(message)
    }

    $timeout(() => {
      $ionicScrollDelegate.scrollBottom(true);
      $scope.$apply()
    })
  })

  $scope.addMessage = () => {
    // let timeStamp = new Date();
    $scope.newMessage = {
      "chat": chatGroup,
      "message": $scope.message,
      "author": $scope.currentUser,
      "timeStamp": (new Date()).toISOString()
    }
    currentChat.set((new Date()).toISOString());
    messageRef.push($scope.newMessage);

    $scope.message = ''
  }
});
