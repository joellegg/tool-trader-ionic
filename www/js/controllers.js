var controllerModule = angular.module('starter.controllers', [])

controllerModule.controller('AddToolCtrl', function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('partials/add-tool-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  })

  $scope.showAddToolModal = () => {
    console.log('adding tool')
    $scope.modal.show()
  };
  $scope.hideAddToolModal = () => {
    $scope.modal.show()
  };

  $scope.createContact = function(u) {
    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    $scope.modal.hide();
  };

});
