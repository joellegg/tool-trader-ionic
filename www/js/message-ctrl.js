controllerModule.controller('MessageCtrl', function($scope, $location, AuthFactory, ToolsFactory) {

  let currentUser;

  AuthFactory.getUser().then((res) => { currentUser = res })

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
