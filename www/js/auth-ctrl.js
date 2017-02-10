controllerModule.controller('AuthCtrl', function($scope, $ionicModal, AuthFactory) {
  console.log('AuthCtrl');

  $scope.register = () => {
    console.log("So you want to register, eh?")
    // let newuid;
    // authFactory.createUser($scope.user_email, $scope.user_password)
    //   .then((response) => {
    //     newuid = response.uid;
    //     // console.log(newuid)
    //   })
    //   .then(() => {
    //     let newUser = { "uid": newuid, "firstName": $scope.firstName, "lastName": $scope.lastName, "email": $scope.user_email };
    //     redditFactory.addUser(newUser);
    //   })
  };
})
