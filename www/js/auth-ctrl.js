controllerModule.controller('AuthCtrl', function($scope, $location, AuthFactory) {

  $scope.register = () => {
    console.log("So you want to register, eh?");
    console.log($scope, $scope.email, $scope.password, $scope.first, $scope.last, $scope.bio, $scope.dob)
    let newuid;
    AuthFactory.createUser($scope.email, $scope.password)
      .then((response) => {
        newuid = response.uid;
        // console.log(newuid)
      })
      .then(() => {
        let newUser = {
          "uid": newuid,
          "email": $scope.email,
          "firstName": $scope.first,
          "lastName": $scope.last,
          "bio": $scope.bio,
          "dob": $scope.dob
        };
        AuthFactory.addUser(newUser);
      })
      .then(() => {
        $location.url('/home')
      })
  };

  $scope.login = () => {
    console.log($scope, $scope.email, $scope.password);
    AuthFactory.login($scope.email, $scope.password)
      .then(() => {
        $location.url('/home')
      });
  };

})
