controllerModule.controller('MessageCtrl', function($scope, $location, $stateParams, AuthFactory, ToolsFactory) {

  let currentUser;
  console.log($stateParams.chatgroup)

  AuthFactory.getUser().then((res) => { currentUser = res });
  // get message groups for current user
  // messageRef.on('child_added', (snapshot, prevChildKey) => {
  //   console.log('child_added', snapshot.val(), prevChildKey);
  //   // get chats user is part of
  //   // loop through members then chats

  // })

  $scope.addMessage = () => {
    let timeStamp = new Date();
    $scope.newMessage = {
      // "chat": chatGroup,
      "message": $scope.message,
      "author": currentUser,
      "timeStamp": timeStamp
    }
    console.log('new message', $scope.newMessage);
  }
});
