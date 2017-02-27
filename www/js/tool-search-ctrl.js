controllerModule.controller('ToolSearchCtrl', function($scope, $location, tools, AuthFactory, ToolsFactory) {
  $scope.tools = tools;
  $scope.toolsData = [];

  for (key in $scope.tools) {
    $scope.tools[key].toolKey = key;
    $scope.toolsData.push($scope.tools[key]);
  }

  $scope.clearSearch = () => {
    $scope.search = [];
  }


  ////////////////////////////////////////
  ////////  TOOL SEARCH FILTER  //////////
  ////////////////////////////////////////
  $scope.search = [];

  // search.tool; search.condition; search.maxPrice; search.pickup; search.dropoff

  $scope.searchForTool = () => {
    // console.log('searchparams', $scope.search);
    // console.log('toolsData', $scope.toolsData);
    ToolsFactory.setSearchParams($scope.search);
    let availableTools = [];

    // filter the tools to match what is available using for loops and push to an array

    // loop through all of the tools
    for (let i = 0; i < $scope.toolsData.length; i++) {
      // search based on the tool
      if ($scope.search.tool && ($scope.search.tool).toLowerCase() === ($scope.toolsData[i].tool).toLowerCase()) {
        let isReserved = false
          // filter to the available tools based on reservations
        for (reservationKey in $scope.toolsData[i].reserved) {
          // if the pickup date is after the reserved dropoff date OR
          // if the dropoff date is before the reserved pickup date
          if ($scope.search.pickup > new Date($scope.toolsData[i].reserved[reservationKey].dropoff) || $scope.search.dropoff < new Date($scope.toolsData[i].reserved[reservationKey].pickup)) {
            // console.log('reservation does not conflict')
          } else {
            isReserved = true
          }
        }
        if (!isReserved) {
          // console.log($scope.toolsData[i].toolKey, ' tool is available');
          // if the user enters a max price then use it to filter otherwise skip it
          if ($scope.search.maxPrice && ($scope.search.maxPrice >= $scope.toolsData[i].price)) {
            availableTools.push($scope.toolsData[i])
            // console.log("and it's in your budget!");
          } else if (!$scope.search.maxPrice) {
            availableTools.push($scope.toolsData[i])
          }
          // console.log('available tools', availableTools)
        }
      }
    }
    // push the results through the factory so they're available in the results view
    ToolsFactory.setAvailableTools(availableTools);
    $location.url('/results');
  };
});
