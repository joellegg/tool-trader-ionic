angular.module('starter.controllers', [])

.controller('ToolSearchCtrl', function($scope, toolsFactory) {
  console.log('Tool search controller');
  toolsFactory.getTools()
    .then((res) => {
      $scope.tools = res;
      // console.log($scope.tools);
      // for (key in $scope.tools) {
      //   console.log($scope.tools[key].category)
      // }
    })
})
