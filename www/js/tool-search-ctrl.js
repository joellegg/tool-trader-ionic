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
    console.log($scope.search);
    ToolsFactory.setSearchParams($scope.search);
    // filter the tools to match what is available using for loops and pushing to an array
    for (let i = 0; i < $scope.toolsData.length; i++) {
      if ($scope.search.tool == $scope.toolsData.tool) {
        console.log('found a match', $scope.search.tool, $scope.toolsData.tool)
      }
    }
    // push the results through the factory so they're available in the results view
    console.log($scope.toolsData)
    // $location.url('/results');
  };

  $scope.reserve = (toolKey) => {
    let searchParams = ToolsFactory.getSearchParams();
    console.log("So you want to reserve this tool eh?", toolKey)
  }
})
