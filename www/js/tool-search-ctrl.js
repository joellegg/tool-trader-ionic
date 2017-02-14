controllerModule.controller('ToolSearchCtrl', function($scope, $location, tools, AuthFactory, ToolsFactory) {
  $scope.tools = tools;
  $scope.toolsData = [];

  for (key in $scope.tools) {
    $scope.tools[key].toolKey = key;
    $scope.toolsData.push($scope.tools[key]);
  }

  $scope.clearSearch = () => {
    $scope.search = '';
  }


  ////////////////////////////////////////
  ////////  SEARCH FOR A TOOL  ///////////
  ////////////////////////////////////////
  $scope.search = [];
  $scope.searchForTool = () => {
    console.log('Begin tool search')
    console.log($scope.search)
  }
})
