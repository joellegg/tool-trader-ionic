controllerModule.controller('ProfileCtrl', function($scope, $ionicModal, $location, AuthFactory, ToolsFactory) {
  console.log('ProfileCtrl Activated');

  $scope.userProfile;

  let currentUser;
  AuthFactory.getUser()
    .then((res) => {
      console.log(res)
      currentUser = res
    }).then(() => {
      ToolsFactory.getUsers()
        .then((users) => {
          // console.log('users', users);
          for (keys in users) {
            if (currentUser === users[keys].uid) {
              // console.log('found match', currentUser, users[keys].uid)
              $scope.userProfile = users[keys];
              console.log('userProfile', $scope.userProfile)
            }
          }
        })
    })

  $scope.logout = () => {
    AuthFactory.logout()
      .then(() => {
        $location.url('/authorize')
      })
  };
});
