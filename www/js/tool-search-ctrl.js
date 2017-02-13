controllerModule.controller('ToolSearchCtrl', function($scope, $location, tools, AuthFactory, ToolsFactory) {
  $scope.tools = tools;
  let toolsData = [];

  for (key in $scope.tools) {
    $scope.tools[key].toolKey = key;
    toolsData.push($scope.tools[key]);
  }
  console.log('toolsData', toolsData);
})
