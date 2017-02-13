controllerModule.controller('ToolSearchCtrl', function($scope, $location, tools, AuthFactory, ToolsFactory) {
  $scope.tools = tools;
  $scope.toolsData = [];

  for (key in $scope.tools) {
    $scope.tools[key].toolKey = key;
    $scope.toolsData.push($scope.tools[key]);
  }
  console.log('toolsData', $scope.toolsData);
})
