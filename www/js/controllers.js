var controllerModule = angular.module('starter.controllers', [])

controllerModule.controller('AddToolCtrl', function($scope, $ionicModal, ToolsFactory) {

  $ionicModal.fromTemplateUrl('partials/add-tool-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  })

  $scope.showAddToolModal = () => {
    console.log('show modal')
    $scope.modal.show()
  };

  $scope.hideAddToolModal = () => {
    console.log('hide modal')
    $scope.modal.hide()
  };

  $scope.createContact = function(u) {
    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    $scope.modal.hide();
  };

  // console.log('Tool search controller');
  ToolsFactory.getTools()
    .then((res) => {
      $scope.tools = res;
    })

});
