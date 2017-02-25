controllerModule.controller('MessageCtrl', function($scope, $location, $stateParams, $ionicScrollDelegate, $cordovaKeyboard, AuthFactory, ToolsFactory, $timeout) {
  $cordovaKeyboard.disableScroll(true)

  // $scope.currentUser;
  let chatGroup = $stateParams.chatgroup;
  $scope.messages = [];

  AuthFactory.getUser().then((res) => { $scope.currentUser = res });
  let chatTimeStamp = chatRef.child(chatGroup + '/timeStamp');
  let chatLastMessage = chatRef.child(chatGroup + '/lastMessage')

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
    $scope.newMessage = {
      "chat": chatGroup,
      "message": $scope.message,
      "author": $scope.currentUser,
      "timeStamp": (new Date()).toISOString()
    }
    chatTimeStamp.set((new Date()).toISOString());
    let postLast = $scope.message.substring(0, 30);
    chatLastMessage.set(postLast);

    messageRef.push($scope.newMessage);

    $scope.message = ''
  }
});
