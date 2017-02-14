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

  // search.tool
  // search.condition
  // search.maxPrice
  // search.pickup
  // search.return

  $scope.searchForTool = () => {
    console.log('searchparams', $scope.search);
    console.log('toolsData', $scope.toolsData)
    ToolsFactory.setSearchParams($scope.search);
    // filter the tools to match what is available using for loops and pushing to an array
    for (let i = 0; i < $scope.toolsData.length; i++) {
      // search based on the tool
      if ($scope.search.tool && ($scope.search.tool).toLowerCase() === ($scope.toolsData[i].tool).toLowerCase()) {
        // then search on all other variables
        if ($scope.search.maxPrice && ($scope.search.maxPrice >= $scope.toolsData[i].price)) {
          console.log("and it's cheap!");
          // filter to the available tools based on reservations
        }
      }
    }
    // push the results through the factory so they're available in the results view
    $location.url('/results');
  };

  $scope.reserve = (toolKey) => {
    let searchParams = ToolsFactory.getSearchParams();
    console.log("So you want to reserve this tool eh?", toolKey)
  }
})
