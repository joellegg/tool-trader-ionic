controllerModule
.controller('ToolSearchCtrl', function($scope, ToolsFactory) {
  console.log('Tool search controller');
  ToolsFactory.getTools()
    .then((res) => {
      $scope.tools = res;
    })
})
