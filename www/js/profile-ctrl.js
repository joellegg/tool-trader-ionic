controllerModule.controller('ProfileCtrl', function($scope, $ionicModal, $location, AuthFactory) {
  console.log('ProfileCtrl Activated');
  $scope.logout = () => {
    console.log('user wants to sign out me thinks')
    AuthFactory.logout()
      .then(() => {
        console.log('logged out')
        $location.url('/authorize')
      })
  };
});
