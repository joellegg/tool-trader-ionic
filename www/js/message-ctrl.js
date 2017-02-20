controllerModule.controller('MessageCtrl', function($scope, $location, AuthFactory, ToolsFactory) {

  let currentUser;

  AuthFactory.getUser().then((res) => { currentUser = res });
  // get message groups for current user
  // messageRef.on('child_added', (snapshot, prevChildKey) => {
  //   console.log('child_added', snapshot.val(), prevChildKey);
  //   // get chats user is part of
  //   // loop through members then chats

  // })

  $scope.newMessage = {};

  $scope.addMessage = () => {
    // console.log("add the message");
    let timeStamp = new Date();

    $scope.newMessage = {
      "message": $scope.message,
      "author": currentUser,
      "timeStamp": timeStamp,
    }

    console.log('new message', $scope.newMessage);
  }
});
