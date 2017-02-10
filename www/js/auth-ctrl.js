controllerModule.controller('AuthCtrl', function($scope, $ionicModal, AuthFactory) {
  console.log('AuthCtrl');

  // /////////////////////////////////////
  // /////////  MODALS  //////////////////
  // /////////////////////////////////////
  // $ionicModal.fromTemplateUrl('partials/login-modal.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // $scope.showLoginModal = () => {
  //   console.log('show modal')
  //   $scope.modal.show()
  // };
  // $scope.hideLoginModal = () => {
  //   console.log('hide modal')
  //   $scope.modal.hide()
  // };
})
